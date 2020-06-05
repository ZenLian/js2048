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
                callback(this.cells[x][y]);
            }
        }
    }
}
