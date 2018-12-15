import { IMonsterData } from "../data/monsters";

export default class Enemy extends Phaser.GameObjects.Sprite {
  public hp: number;
  public attack: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    monsterInfo: IMonsterData
  ) {
    const { spriteKey, hp, name, attack } = monsterInfo;
    super(scene, x, y, spriteKey);

    this.hp = hp;
    this.name = name;
    this.attack = attack;

    scene.add.existing(this);
  }

  public takeDamage(damage: number): boolean {
    this.hp -= damage;
    console.log("Enemy took damage, current hp:", this.hp);

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
