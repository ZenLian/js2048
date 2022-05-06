class Tile {
  constructor(pos, value) {
    this.x = pos.x;
    this.y = pos.y;
    this.value = value;
    this.newborn = false;
    this.mergedFrom = null;
    this.movedFrom = null;
  }

  updatePosition(pos) {
    this.x = pos.x;
    this.y = pos.y;
  }
}
