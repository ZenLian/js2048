class InputManager {
  constructor() {
    this.events = {};
    this.disabledEvents = new Set();

    this.xDown = null;
    this.yDown = null;
    this.swipeMotion = null;
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

    // buttons(button value in HTML as event name)
    let buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      let event = button.value;
      button.addEventListener("click", () => {
        self.emit(event, null);
      });
    });

    // handle swipe
    let swipeArea = document.querySelector(".grid-container");
    swipeArea.addEventListener(
      "touchstart",
      this.handleTouchStart.bind(this),
      false
    );
    swipeArea.addEventListener(
      "touchmove",
      this.handleTouchMove.bind(this),
      false
    );
    swipeArea.addEventListener(
      "touchend",
      this.handleTouchEnd.bind(this),
      false
    );
  }

  // ref: https://www.codegrepper.com/code-examples/javascript/javascript+swipe+left+and+swipe+right
  handleTouchStart(evt) {
    evt.preventDefault();
    const firstTouch = evt.touches[0];
    this.xDown = firstTouch.clientX;
    this.yDown = firstTouch.clientY;
  }

  handleTouchMove(evt) {
    evt.preventDefault();
    if (!this.xDown || !this.yDown) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = this.xDown - xUp;
    let yDiff = this.yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /* left swipe */
        this.swipeMotion = "left";
      } else {
        /* right swipe */
        this.swipeMotion = "right";
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
        this.swipeMotion = "up";
      } else {
        /* down swipe */
        this.swipeMotion = "down";
      }
    }
    /* reset values */
    // this.xDown = null;
    // this.yDown = null;
  }

  handleTouchEnd(evt) {
    evt.preventDefault();
    if (this.swipeMotion) {
      this.emit("move", this.swipeMotion);
    }
    /* reset values */
    this.xDown = null;
    this.yDown = null;
    this.swipeMotion = null;
  }
}
