'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const config = require(__dirname + '/../../config/database.ts')[env];


const db = {} as any;

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize.Sequelize(process.env[config.use_env_variable]  ?? "", config);
} else {
  sequelize = new Sequelize.Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (['.js', '.ts'].some(x => x === file.slice(-3)));
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
