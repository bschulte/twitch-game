export default class Player extends Phaser.GameObjects.Sprite {
  public hp: number;
  public attack: number;

  constructor(scene: Phaser.Scene, x: number, y: number, spriteKey: string) {
    super(scene, x, y, spriteKey);

    this.hp = 4;
    this.attack = 5;

    scene.physics.world.enable(this);
    scene.add.existing(this);
  }

  public takeDamage(damage: number): boolean {
    this.hp -= damage;
    console.log("Player took damage, current hp:", this.hp);

    if (this.hp <= 0) {
      this.die();
      return true;
    }

    return false;
  }

  private die() {
    this.destroy();
  }
}
