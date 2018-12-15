import Player from "../sprites/Player";
import Enemy from "../sprites/Enemy";
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
  private engagedEnemy: Enemy;

  private state: State;

  private attackCooldownTimer: number = 0;

  constructor() {
    super({
      key: "MainScene"
    });

    this.state = State.MOVING;
  }

  preload(): void {
    this.load.image("player", "./assets/images/sprites/elf_f_idle_anim_f3.png");
    this.load.image(
      "goblin",
      "./assets/images/sprites/goblin_idle_anim_f0.png"
    );

    this.load.image("default-tiles", "./assets/images/tilemap.png");
    this.load.tilemapTiledJSON("map", "./assets/maps/default.json");

    // Load in the CSS needed for fonts
    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);
    const sheet = styleElement.sheet as CSSStyleSheet;

    const fontStyles =
      '@font-face {font-family: "mono-pixel"; src url("assets/font/pixel_mono.ttf") format("truetype"); }';
    sheet.insertRule(fontStyles);
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
  }

  createEnemy(enemy) {
    const enemyType = getEnemyType(enemy);
    const monsterInfo = getMonsterData(enemyType);

    const newEnemy = new Enemy(this, enemy.x, enemy.y, monsterInfo);
    this.enemies.add(newEnemy);

    newEnemy.hp = monsterInfo.hp;
  }

  setupCollision() {
    console.log("setting up collision", this.enemies);
    this.physics.add.collider(this.player, this.enemies, (_, enemy: Enemy) => {
      this.engagedEnemy = enemy;
      this.state = State.COMBAT;
    });
  }

  setupGroups() {
    this.enemies = this.physics.add.staticGroup();
  }

  handleAttackState(deltaTime) {
    if (this.attackCooldownTimer <= 0) {
      const enemyDied = this.engagedEnemy.takeDamage(this.player.attack);
      const playerDied = this.player.takeDamage(this.engagedEnemy.attack);

      if (enemyDied) {
        this.state = State.MOVING;
      }

      this.attackCooldownTimer = ATTACK_COOLDOWN;
    } else {
      this.attackCooldownTimer -= deltaTime;
    }
  }

  create(): void {
    this.setupGroups();
    this.loadMap();
    this.setupCollision();
  }

  update(_, deltaTime: number): void {
    switch (this.state) {
      case State.COMBAT: {
        this.handleAttackState(deltaTime);
        break;
      }

      case State.MOVING: {
        this.player.body.velocity.x = 100;
        break;
      }

      default:
        break;
    }

    this.player.update();
  }
}
