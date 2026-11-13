
export class Input {
    constructor() {
        this.keys = new Set();
        this.pressed = new Set();

        window.addEventListener("keydown", (event) => {
            const key = event.key.toLowerCase();

            if ([" ", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
                event.preventDefault();
            }

            if (!this.keys.has(key)) {
                this.pressed.add(key);
            }

            this.keys.add(key);
        });

        window.addEventListener("keyup", (event) => {
            this.keys.delete(event.key.toLowerCase());
        });

        window.addEventListener("blur", () => {
            this.keys.clear();
            this.pressed.clear();
        });
    }

    isDown(...keys) {
        return keys.some(key => this.keys.has(key));
    }

    wasPressed(...keys) {
        return keys.some(key => this.pressed.has(key));
    }

    endFrame() {
        this.pressed.clear();
    }
}
