
export class Player {
    constructor(x, y) {
        this.spawnX = x;
        this.spawnY = y;

        this.x = x;
        this.y = y;

        this.width = 28;
        this.height = 42;

        this.speed = 260;
        this.jumpForce = 650;
        this.gravity = 1800;

        this.velocityX = 0;
        this.velocityY = 0;

        this.grounded = false;
        this.facing = 1;
    }

    update(dt, input, world) {
        const previousX = this.x;

        // Horizontal movement
        let direction = 0;

        if (input.isDown("a", "arrowleft")) direction -= 1;
        if (input.isDown("d", "arrowright")) direction += 1;

        this.velocityX = direction * this.speed;

        if (direction !== 0) {
            this.facing = direction;
        }

        this.x += this.velocityX * dt;

        world.resolveHorizontal(this, previousX);

        // Jumping
        if (
            input.wasPressed(" ", "w", "arrowup") &&
            this.grounded
        ) {
            this.velocityY = -this.jumpForce;
            this.grounded = false;
        }

        // Gravity
        const previousY = this.y;

        this.velocityY += this.gravity * dt;
        this.velocityY = Math.min(this.velocityY, 1000);

        this.y += this.velocityY * dt;

        world.resolveVertical(this, previousY);

        // Prevent falling outside the world
        this.x = Math.max(-150, Math.min(this.x, world.width - this.width));

        if (this.y > 1000) {
            this.reset();
        }
    }

    draw(ctx) {
        // Temporary character body
        ctx.fillStyle = "#c5c4bd";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Head
        ctx.fillStyle = "#e5d9c4";
        ctx.fillRect(this.x + 4, this.y, 20, 15);

        // Eyes
        ctx.fillStyle = "#a83250";

        const eyeX = this.facing === 1 ? this.x + 17 : this.x + 7;
        ctx.fillRect(eyeX, this.y + 6, 4, 3);

        // Feet
        ctx.fillStyle = "#7b7771";
        ctx.fillRect(this.x + 2, this.y + 37, 10, 5);
        ctx.fillRect(this.x + 16, this.y + 37, 10, 5);
    }

    reset() {
        this.x = this.spawnX;
        this.y = this.spawnY;
        this.velocityX = 0;
        this.velocityY = 0;
        this.grounded = false;
    }
}
