class Renderer {
  constructor(size) {
    this.size = size;
    this.setup();
  }

  // render grid-cells
  setup() {
    this.gridContainer = document.querySelector(".grid-container");
    // remove all children
    this.removeAllChildren(this.gridContainer);
    // add cells
    for (let i = 0; i < this.size * this.size; i++) {
      let cell = document.createElement("div");
      cell.classList.add("grid-cell");
      this.gridContainer.appendChild(cell);
    }
  }

  removeAllChildren(node) {
    // TODO: performence consuming?
    node.textContent = "";
  }

  getIndex(pos) {
    return pos.x * this.size + pos.y;
  }

  getPos(index) {
    return {
      x: index / this.size,
      y: index % this.size,
    };
  }

  clearCell(x, y) {
    let index = this.getIndex({ x: x, y: y });
    let cell = this.gridContainer.childNodes[index];
    this.removeAllChildren(cell);
  }

  addTile(tile) {
    let index = this.getIndex({ x: tile.x, y: tile.y });
    let cell = this.gridContainer.childNodes[index];
    this.removeAllChildren(cell);

    let tileNode = document.createElement("div");
    tileNode.classList.add("tile");
    tileNode.textContent = tile.value;
    cell.appendChild(tileNode);
  }

  render(grid) {
    grid.forEachCell((x, y, tile) => {
      if (tile) {
        this.addTile(tile);
      } else {
        this.clearCell(x, y);
      }
    });
  }
}
