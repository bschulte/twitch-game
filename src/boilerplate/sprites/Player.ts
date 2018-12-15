export default class Player extends Phaser.GameObjects.Sprite {
  public hp: number;

  constructor(scene: Phaser.Scene, x: number, y: number, spriteKey: string) {
    super(scene, x, y, spriteKey);

    this.hp = 50;
    scene.physics.world.enable(this);
    scene.add.existing(this);

    this.body.velocity.x = 100;
  }
}
