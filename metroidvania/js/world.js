
export class World {
    constructor() {
        this.width = 3000;
        this.height = 540;

        this.platforms = [
            // Main floor
            { x: -200, y: 480, width: 3400, height: 100 },

            // Platforms
            { x: 300, y: 390, width: 160, height: 20 },
            { x: 570, y: 320, width: 180, height: 20 },
            { x: 850, y: 400, width: 200, height: 20 },
            { x: 1150, y: 340, width: 170, height: 20 },
            { x: 1450, y: 280, width: 200, height: 20 },
            { x: 1800, y: 370, width: 180, height: 20 },
            { x: 2150, y: 310, width: 200, height: 20 },
            { x: 2500, y: 400, width: 180, height: 20 }
        ];
    }

    draw(ctx, camera) {
        // Background
        ctx.fillStyle = "#111923";
        ctx.fillRect(0, 0, 960, 540);

        // Background decoration
        ctx.fillStyle = "#182431";

        for (let i = 0; i < 12; i++) {
            const x = i * 300 - camera.x * 0.3;

            ctx.beginPath();
            ctx.moveTo(x, 480);
            ctx.lineTo(x + 140, 140 + (i % 3) * 35);
            ctx.lineTo(x + 280, 480);
            ctx.fill();
        }

        ctx.save();
        ctx.translate(-camera.x, 0);

        // Platforms
        for (const platform of this.platforms) {
            ctx.fillStyle = "#35434a";
            ctx.fillRect(
                platform.x,
                platform.y,
                platform.width,
                platform.height
            );

            ctx.fillStyle = "#718078";
            ctx.fillRect(
                platform.x,
                platform.y,
                platform.width,
                4
            );
        }

        ctx.restore();
    }

    resolveHorizontal(player, previousX) {
        for (const platform of this.platforms) {
            const verticalOverlap =
                player.y + player.height > platform.y &&
                player.y < platform.y + platform.height;

            if (!verticalOverlap) continue;

            const horizontalOverlap =
                player.x + player.width > platform.x &&
                player.x < platform.x + platform.width;

            if (!horizontalOverlap) continue;

            if (player.velocityX > 0 && previousX + player.width <= platform.x + 0.01) {
                player.x = platform.x - player.width;
                player.velocityX = 0;
            } else if (
                player.velocityX < 0 &&
                previousX >= platform.x + platform.width - 0.01
            ) {
                player.x = platform.x + platform.width;
                player.velocityX = 0;
            }
        }
    }

    resolveVertical(player, previousY) {
        player.grounded = false;

        for (const platform of this.platforms) {
            const horizontalOverlap =
                player.x + player.width > platform.x &&
                player.x < platform.x + platform.width;

            if (!horizontalOverlap) continue;

            const previousBottom = previousY + player.height;
            const currentBottom = player.y + player.height;

            // Landing
            if (
                player.velocityY >= 0 &&
                previousBottom <= platform.y + 0.01 &&
                currentBottom >= platform.y
            ) {
                player.y = platform.y - player.height;
                player.velocityY = 0;
                player.grounded = true;
            }

            const previousTop = previousY;
            const currentTop = player.y;

            // Hitting the underside
            if (
                player.velocityY < 0 &&
                previousTop >= platform.y + platform.height - 0.01 &&
                currentTop <= platform.y + platform.height
            ) {
                player.y = platform.y + platform.height;
                player.velocityY = 0;
            }
        }
    }
}
