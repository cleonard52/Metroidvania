
import { Input } from "./input.js";
import { Player } from "./player.js";
import { World } from "./world.js";
import { Camera } from "./camera.js";

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.ctx.imageSmoothingEnabled = false;

        this.input = new Input();
        this.world = new World();
        this.player = new Player(100, 400);
        this.camera = new Camera();

        this.lastTime = 0;
        this.running = false;
    }

    start() {
        this.running = true;
        requestAnimationFrame((time) => this.loop(time));
    }

    loop(time) {
        if (!this.running) return;

        const dt = this.lastTime
            ? Math.min((time - this.lastTime) / 1000, 0.033)
            : 0;

        this.lastTime = time;

        this.update(dt);
        this.draw();

        this.input.endFrame();

        requestAnimationFrame((nextTime) => this.loop(nextTime));
    }

    update(dt) {
        if (this.input.wasPressed("r")) {
            this.player.reset();
        }

        this.player.update(dt, this.input, this.world);
        this.camera.update(this.player, this.world, dt);
    }

    draw() {
        const ctx = this.ctx;

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.world.draw(ctx, this.camera);

        ctx.save();
        ctx.translate(-this.camera.x, 0);

        this.player.draw(ctx);

        ctx.restore();
    }
}
