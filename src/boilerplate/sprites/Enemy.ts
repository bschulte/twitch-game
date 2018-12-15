import { IMonsterData } from "../data/monsters";

export default class Enemy extends Phaser.GameObjects.Sprite {
  public hp: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    monsterInfo: IMonsterData
  ) {
    const { spriteKey, hp, name } = monsterInfo;
    super(scene, x, y, spriteKey);

    this.hp = hp;
    this.name = name;

    scene.add.existing(this);
  }
}
