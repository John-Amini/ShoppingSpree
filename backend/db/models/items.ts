'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    layoutId: DataTypes.INTEGER,
    color:DataTypes.STRING
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsTo(models.Layout,{foreignKey:'layoutId'})
  };
  return Item;
};
