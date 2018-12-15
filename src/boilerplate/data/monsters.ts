export interface IMonsterData {
  name: string;
  hp: number;
  spriteKey: string;
  enemyType: string;
  attack: number;
}

const data = [
  {
    enemyType: "goblin",
    name: "Goblin",
    hp: 10,
    spriteKey: "goblin",
    attack: 2
  },
  {
    enemyType: "orc",
    name: "Orc",
    hp: 20,
    spriteKey: "orc",
    attack: 4
  }
];

export const getMonsterData = (enemyType): IMonsterData => {
  return data.find((monster: IMonsterData) => monster.enemyType === enemyType);
};
