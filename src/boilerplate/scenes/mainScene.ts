import Player from "../sprites/Player";
import { getObjectName, getEnemyType } from "../util/tiledHelpers";
import { getMonsterData } from "../data/monsters";

enum State {
  MOVING,
  COMBAT
}

const ATTACK_COOLDOWN = 2000;

export class MainScene extends Phaser.Scene {
  private player: Player;
  private enemies: Phaser.Physics.Arcade.StaticGroup;

  private state: State;

  private attackOnCooldown: boolean;
  private attackCooldownTimer: number;

  constructor() {
    super({
      key: "MainScene"
    });

    this.state = State.MOVING;
    this.attackOnCooldown = false;
  }

  preload(): void {
    this.load.image("player", "./assets/images/sprites/elf_f_idle_anim_f3.png");
    this.load.image(
      "goblin",
      "./assets/images/sprites/goblin_idle_anim_f0.png"
    );

    this.load.image("default-tiles", "./assets/images/tilemap.png");
    this.load.tilemapTiledJSON("map", "./assets/maps/default.json");
  }

  // Load the tilemap and any objects within it
  loadMap(): void {
    // create tilemap
    const map = this.make.tilemap({ key: "map" });

    const tiles = map.addTilesetImage(
      "0x72_DungeonTilesetII_v1.1",
      "default-tiles"
    );

    map.createStaticLayer(0, tiles, 0, 0);
    map.createStaticLayer(1, tiles, 0, 0);

    map.objects.forEach(objectLayer => {
      // Loop through objects in layer and handle their creation
      objectLayer.objects.forEach(obj => this.createObject(obj));
    });

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }

  createObject(obj: Phaser.GameObjects.GameObject) {
    console.log("Creating object:", obj);
    const name: string = getObjectName(obj);

    if (name === "player") {
      this.createPlayer(obj);
    } else if (name === "enemy") {
      this.createEnemy(obj);
    }
  }

  createPlayer(player) {
    this.player = new Player(this, player.x, player.y, "player");
    this.physics.add.existing(this.player);

    this.player.setVelocityX(100);
  }

  createEnemy(enemy) {
    const enemyType = getEnemyType(enemy);
    const monsterInfo = getMonsterData(enemyType);

    const newEnemy = this.enemies.create(
      enemy.x,
      enemy.y,
      monsterInfo.spriteKey
    );

    newEnemy.hp = monsterInfo.hp;
    newEnemy.monsterName = monsterInfo.name;
  }

  setupCollision() {
    this.physics.add.collider(this.player, this.enemies, (obj1, obj2) => {
      console.log("player hit enemy");
      console.log("obj1:", obj1);
      console.log("obj2:", obj2);

      this.state = State.COMBAT;
    });
  }

  setupGroups() {
    this.enemies = this.physics.add.staticGroup();
  }

  handleAttackState(deltaTime) {
    if (!this.attackOnCooldown) {
      console.log("Player and enemies attack each other!");

      this.attackOnCooldown = true;
      this.attackCooldownTimer = ATTACK_COOLDOWN;
    } else {
      this.attackCooldownTimer -= deltaTime;
      if (this.attackCooldownTimer <= 0) {
        this.attackOnCooldown = false;
      }
    }
  }

  create(): void {
    this.setupGroups();
    this.loadMap();
    this.setupCollision();
  }

  update(_, deltaTime): void {
    switch (this.state) {
      case State.COMBAT: {
        this.handleAttackState(deltaTime);
      }
    }
  }
}
