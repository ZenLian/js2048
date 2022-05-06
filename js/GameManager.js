class GameManager {
  constructor(size, InputManager, Renderer) {
    this.size = size;
    this.inputManager = new InputManager();
    this.renderer = new Renderer(size);

    // event listener
    this.inputManager.on("move", this.move.bind(this));
    this.inputManager.on("restart", this.setup.bind(this));
    this.setup();
  }

  // setup game
  setup() {
    console.log("setup game");
    this.grid = new Grid(this.size);
    this.gameOver = false;
    this.score = 0;

    // initial tiles
    this.addRandomTile();
    this.addRandomTile();

    // update game interface
    this.render();
  }

  // do moving
  move(direction) {
    console.log("move: " + direction);
    let self = this;
    let moved = false;

    // clean up new/moved/merged information before each movement
    this.grid.forEachCell((x, y, tile) => {
      if (tile) {
        tile.newborn = false;
        tile.mergedFrom = null;
      }
    });

    // get right traversal direction
    let vector = self.buildVector(direction);
    console.log(vector);
    let traversals = self.buildTraversals(vector);
    // do merge/move
    traversals.x.forEach((x) => {
      traversals.y.forEach((y) => {
        let position = { x: x, y: y };
        console.log(`traverse at (${position.x}, ${position.y})`);
        let tile = self.grid.cellContent(position);
        if (tile) {
          console.log(`tile: ${tile.value}`);
          let positions = self.findFarthestPosition(position, vector);
          console.log("findFarthestPosition: " + positions);
          let next = self.grid.cellContent(positions.next);
          // merge 2 tiles
          if (next && next.value === tile.value && !next.mergedFrom) {
            let mergedTile = new Tile(positions.next, tile.value * 2);
            // only merge once
            mergedTile.mergedFrom = [tile, next];
            self.grid.insertTile(mergedTile);
            self.grid.removeTile(tile);
            self.score += mergedTile.value;
            console.log("merged");
            moved = true;
          }
          // move this tile
          else if (self.moveTile(tile, positions.farthest)) {
            console.log("moved");
            moved = true;
          }
        }
      });
    });

    console.log("traversal over");
    if (moved) {
      this.addRandomTile();
      // check game over
      if (this.isGameOver()) {
        // TODO:
        this.gameOver = true;
        window.requestAnimationFrame(() => {
          alert("game over!");
        });
      }

      this.render();
    }
  }

  addRandomTile() {
    console.log("GameManager: addRandomTile");
    if (this.grid.cellsAvailable()) {
      let value = Math.random() < 0.9 ? 2 : 4;
      console.log(`random value: ${value}`);
      this.grid.addRandomTile(value);
    }
  }

  buildVector(direction) {
    // get vector representing the chosen direction
    let map = {
      up: { x: -1, y: 0 },
      down: { x: 1, y: 0 },
      left: { x: 0, y: -1 },
      right: { x: 0, y: 1 },
    };
    return map[direction];
  }

  buildTraversals(vector) {
    let traversals = {
      x: [],
      y: [],
    };
    for (let i = 0; i < this.size; i++) {
      traversals.x.push(i);
      traversals.y.push(i);
    }

    // reverse in chosen direction
    if (vector.x === 1) {
      traversals.x = traversals.x.reverse();
    }
    if (vector.y === 1) {
      traversals.y = traversals.y.reverse();
    }
    return traversals;
  }

  findFarthestPosition(position, vector) {
    let previous = position;
    do {
      previous = position;
      position = { x: previous.x + vector.x, y: previous.y + vector.y };
      console.log("previous: ");
      console.log(previous);
      console.log("next: ");
      console.log(position);
    } while (
      this.grid.withinBounds(position) &&
      this.grid.cellAvailable(position)
    );
    return {
      farthest: previous,
      next: position,
    };
  }

  positionEqual(lhs, rhs) {
    return lhs.x === rhs.x && lhs.y === rhs.y;
  }

  // move tile to position
  // return true if actually moved
  moveTile(tile, position) {
    if (
      !this.grid.cellAvailable(position) ||
      this.positionEqual({ x: tile.x, y: tile.y }, position)
    ) {
      return false;
    }
    this.grid.removeTile(tile);
    tile.updatePosition(position);
    this.grid.insertTile(tile);
    return true;
  }

  isGameOver() {
    if (this.grid.cellsAvailable()) {
      return false;
    }

    let isGameOver = true;
    this.grid.forEachCell((x, y, tile) => {
      // check two direction is enough for a full grid
      let dirs = ["down", "right"];
      for (const index in dirs) {
        let dir = dirs[index];
        let vector = this.buildVector(dir);
        console.log(vector);
        let next = { x: x + vector.x, y: y + vector.y };
        let nextTile = this.grid.cellContent(next);
        if (nextTile && nextTile.value === tile.value) {
          isGameOver = false;
        }
      }
    });
    return isGameOver;
  }

  // render grid
  render() {
    console.log("render grid");
    let metadata = {
      score: this.score,
    };
    this.renderer.render(this.grid, metadata);
    console.log("render over");
  }
}
