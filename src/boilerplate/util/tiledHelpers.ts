export const getObjectName = (obj): string => {
  return obj.properties.find(prop => prop.name === "name").value;
};

export const getEnemyType = (obj): string => {
  return obj.properties.find(prop => prop.name === "enemyType").value;
};
