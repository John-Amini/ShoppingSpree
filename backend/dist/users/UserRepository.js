"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const models_1 = __importDefault(require("../db/models"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserRepository {
    constructor() {
        this.UserConn = models_1.default.User;
    }
    findByPk(id) {
        return this.UserConn.scope('currentUser').findByPk(id);
    }
    findByUsernameOrEmail(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Op } = require('sequelize');
            const user = yield this.UserConn.scope('loginUser').findOne({
                where: {
                    [Op.or]: {
                        username: credential,
                        email: credential,
                    },
                },
            });
            return user;
        });
    }
    create(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = bcryptjs_1.default.hashSync(password);
            const user = yield this.UserConn.create({
                username,
                email,
                hashedPassword,
            });
            return yield this.UserConn.scope('currentUser').findByPk(user.id);
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map