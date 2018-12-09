export default class Player extends Phaser.Physics.Arcade.Sprite {
  public hp: number;

  constructor(scene: Phaser.Scene, x: number, y: number, spriteKey: string) {
    super(scene, x, y, spriteKey);

    this.hp = 50;
  }
}
