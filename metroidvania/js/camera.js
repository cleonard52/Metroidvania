
export class Camera {
    constructor() {
        this.x = 0;
        this.width = 960;
        this.height = 540;
    }

    update(player, world, dt) {
        const targetX =
            player.x + player.width / 2 - this.width / 2;

        const maxX = Math.max(0, world.width - this.width);

        const clampedTarget = Math.max(0, Math.min(targetX, maxX));

        // Smooth camera movement
        const smoothing = 1 - Math.exp(-8 * dt);

        this.x += (clampedTarget - this.x) * smoothing;
    }
}
