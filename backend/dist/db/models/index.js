'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = __importDefault(require("sequelize"));
const basename = path_1.default.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/database.ts')[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
    sequelize = new sequelize_1.default.Sequelize((_a = process.env[config.use_env_variable]) !== null && _a !== void 0 ? _a : "", config);
}
else {
    sequelize = new sequelize_1.default.Sequelize(config.database, config.username, config.password, config);
}
fs_1.default
    .readdirSync(__dirname)
    .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (['.js', '.ts'].some(x => x === file.slice(-3)));
})
    .forEach(file => {
    const model = require(path_1.default.join(__dirname, file))(sequelize, sequelize_1.default.DataTypes);
    db[model.name] = model;
});
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.default;
exports.default = db;
//# sourceMappingURL=index.js.map