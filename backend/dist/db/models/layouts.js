'use strict';
module.exports = (sequelize, DataTypes) => {
    const Layout = sequelize.define('Layout', {
        userId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        layout: DataTypes.JSONB
    }, {});
    Layout.associate = function (models) {
        // associations can be defined here
        Layout.belongsTo(models.User, { foreignKey: 'userId' });
        Layout.hasMany(models.Item, { foreignKey: 'layoutId' });
    };
    return Layout;
};
//# sourceMappingURL=layouts.js.map