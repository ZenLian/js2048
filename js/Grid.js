class Grid {
  constructor(size) {
    this.size = size;
    this.cells = this.newCells();
  }

  newCells() {
    var cells = [];
    for (let i = 0; i < this.size; i++) {
      cells[i] = [];
      for (let j = 0; j < this.size; j++) {
        cells[i][j] = null;
      }
    }
    return cells;
  }

  forEachCell(callback) {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        callback(x, y, this.cells[x][y]);
      }
    }
  }

  // check if position is valid
  withinBounds(position) {
    return (
      position.x >= 0 &&
      position.x < this.size &&
      position.y >= 0 &&
      position.y < this.size
    );
  }

  // get tile at position
  cellContent(position) {
    if (this.withinBounds(position)) {
      return this.cells[position.x][position.y];
    } else {
      return null;
    }
  }

  // check if cell is empty
  cellAvailable(position) {
    return !this.cellContent(position);
  }

  // check if cell is occupied
  cellOccupied(position) {
    return !!this.cellContent(position);
  }

  // insert given tile
  insertTile(tile) {
    if (this.withinBounds({ x: tile.x, y: tile.y })) {
      this.cells[tile.x][tile.y] = tile;
    }
  }

  removeTile(tile) {
    if (this.withinBounds({ x: tile.x, y: tile.y })) {
      this.cells[tile.x][tile.y] = null;
    }
  }

  // return an array of all available cells
  availableCells() {
    let cells = [];
    this.forEachCell((x, y, tile) => {
      if (!tile) {
        cells.push({ x: x, y: y });
      }
    });
    return cells;
  }

  // get available cell count
  cellsAvailable() {
    return !!this.availableCells().length;
  }

  // add random tile
  addRandomTile(value) {
    let cells = this.availableCells();
    let index = Math.floor(Math.random() * cells.length);
    let position = cells[index];

    let newTile = new Tile(position, value);
    // newTile.newborn = true;
    this.insertTile(newTile);

    console.log(
      `addRandomTile ${newTile.value} at [${newTile.x}, ${newTile.y}]`
    );
  }
}
