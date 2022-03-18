'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Items', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            weight: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            layoutId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: "Layouts" }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Items');
    }
};
//# sourceMappingURL=20220315021122-create-items.js.map