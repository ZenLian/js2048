class Tile {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.newborn = false;
        this.merged = false;
        this.previous = null;
    }
}
