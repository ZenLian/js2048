class InputManager {
  constructor() {
    this.events = {};
    this.disabledEvents = new Set();

    this.listen();
  }

  setup() {
    this.events = {};
    this.disabledEvents.clear();
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event, data) {
    if (this.disabledEvents.has(event)) {
      return;
    }
    let callbacks = this.events[event];
    if (callbacks) {
      callbacks.forEach((callback) => {
        callback(data);
      });
    }
  }

  disable(event) {
    this.disabledEvents.add(event);
  }

  enable(event) {
    this.disabledEvents.delete(event);
  }

  ///
  /// private
  ///
  listen() {
    let self = this;
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
        self.emit("move", motion);
      }
    });

    let buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      let event = button.value;
      button.addEventListener("click", () => {
        self.emit(event, null);
      });
    });
  }
}
