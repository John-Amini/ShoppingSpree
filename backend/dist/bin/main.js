#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { port } = require('../config');
const app_1 = __importDefault(require("../app"));
const models_1 = __importDefault(require("../db/models"));
// Check the database connection before starting the app
models_1.default.sequelize
    .authenticate()
    .then(() => {
    console.log('Database connection success! Sequelize is ready to use...');
    // Start listening for connections
    app_1.default.listen(port, () => console.log(`Listening on port ${port}...`));
})
    .catch((err) => {
    console.log('Database connection failure.');
    console.error(err);
});
//# sourceMappingURL=main.js.map