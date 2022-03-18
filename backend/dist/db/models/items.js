'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const create = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
        name: DataTypes.STRING,
        weight: DataTypes.INTEGER,
        layoutId: DataTypes.INTEGER
    }, {});
    Item.associate = function (models) {
        // associations can be defined here
        Item.belongsTo(models.Layout, { foreignKey: 'layoutId' });
    };
    return Item;
};
exports.default = create;
//# sourceMappingURL=items.js.map