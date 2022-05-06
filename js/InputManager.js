class InputManager {
  constructor() {
    this.events = {};

    this.listen();
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event, data) {
    let callbacks = this.events[event];
    if (callbacks) {
      callbacks.forEach((callback) => {
        callback(data);
      });
    }
  }

  ///
  /// private
  ///
  listen() {
    // direction keys to move
    document.addEventListener("keydown", (keyboardEvent) => {
      let keymap = {
        a: "left",
        w: "up",
        d: "right",
        s: "down",
        A: "left",
        W: "up",
        D: "right",
        S: "down",
        ArrowLeft: "left",
        ArrowUp: "up",
        ArrowRight: "right",
        ArrowDown: "down",
      };
      let motion = keymap[keyboardEvent.key];
      if (motion) {
        keyboardEvent.preventDefault();
        this.emit("move", motion);
      }
    });

    let restartButton = document.querySelector(".restart-button");
    restartButton.addEventListener("click", () => {
      this.emit("restart", null);
    });
  }
}
