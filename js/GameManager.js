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

        // move left
        if (motion === "left") {
            this.moveleft();
        }
    }

    moveleft() {}

    addRandomTile() {}
}
