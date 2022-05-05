class Tile {
  constructor(pos, value) {
    this.x = pos.x;
    this.y = pos.y;
    this.value = value;
    // this.newborn = false;
    this.merged = false;
    // this.previous = null;
  }

  updatePosition(pos) {
    this.x = pos.x;
    this.y = pos.y;
  }
}
