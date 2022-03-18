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
exports.validateSignup = exports.router = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validation_1 = require("../../utils/validation");
const auth_1 = require("../../utils/auth");
const UserRepository_1 = require("../../users/UserRepository");
const UserService_1 = require("../../users/UserService");
const { User } = require("../../db/models");
exports.router = express_1.default.Router();
exports.validateSignup = [
    (0, express_validator_1.check)('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    (0, express_validator_1.check)('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    (0, express_validator_1.check)('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    (0, express_validator_1.check)('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    validation_1.handleValidationErrors,
];
// Sign up
exports.router.post('', exports.validateSignup, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    const userService = new UserService_1.UserService(new UserRepository_1.UserRepository());
    const user = yield userService.signup(username, email, password);
    yield (0, auth_1.setTokenCookie)(res, user);
    return res.json({
        user,
    });
})));
exports.default = exports.router;
//# sourceMappingURL=users.js.map