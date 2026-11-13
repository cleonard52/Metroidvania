
import { Game } from "./game.js";

const canvas = document.getElementById("game");

if (!canvas) {
    throw new Error("Game canvas could not be found.");
}

const game = new Game(canvas);
game.start();
