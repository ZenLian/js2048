class GameManager {
    constructor(size, InputManager) {
        this.size = size;
        this.inputMagager = new InputManager();
        this.grid = new Grid(size);

        this.setup();
    }

    ///
    /// private
    ///

    // setup game
    setup() {
        // TODO:
        this.addRandomTile();
        this.addRandomTile();
        this.inputMagager.on("move", this.move.bind(this));
    }

    // TODO: do moving
    move(motion) {
        // TODO: get merge direction according to motion
        var traversals = this.buildTraversals(motion);
        traversals.x.forEach((x) => {
            traversals.y.forEach((y) => {
                var position = { x: x, y: y };
                var tile = this.grid.CellContent(position);
                if (tile) {
                    var lastTile = this.findLastTile(
                        position,
                        traversals.vector
                    );
                    // situation 1: first tile
                    if (lastTile === tile) {
                        continue;
                    }
                    if (
                        lastTile &&
                        lastTile.value === tile.value &&
                        !lastTile.mergedFrom
                    ) {
                    }
                }
            });
        });
    }

    addRandomTile() {
        if (this.grid.cellsAvailable()) {
            let value = Math.random() < 0.9 ? 2 : 4;
            this.grid.addRandomTile(value);
        }
    }

    //TODO
    buildTraversals(motion) {}
}
