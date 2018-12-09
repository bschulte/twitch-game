interface IMonsterData {
  name: string;
  hp: number;
  spriteKey: string;
  enemyType: string;
}

const data = [
  {
    enemyType: "goblin",
    name: "Goblin",
    hp: 10,
    spriteKey: "goblin"
  },
  {
    enemyType: "orc",
    name: "Orc",
    hp: 20,
    spriteKey: "orc"
  }
];

export const getMonsterData = (enemyType): IMonsterData => {
  return data.find((monster: IMonsterData) => monster.enemyType === enemyType);
};
