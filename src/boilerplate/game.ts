/// <reference path="../phaser.d.ts"/>

import "phaser";
import { MainScene } from "./scenes/mainScene";

// main game configuration
const config: GameConfig = {
  width: 768,
  height: 150,
  backgroundColor: "#131313",
  type: Phaser.AUTO,
  parent: "game",
  scene: MainScene,
  pixelArt: true,
  zoom: 3,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  }
};

// game class
export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

// when the page is loaded, create our game instance
window.onload = () => {
  var game = new Game(config);
};
