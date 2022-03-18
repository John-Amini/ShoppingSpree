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
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validation_1 = require("../../utils/validation");
const auth_1 = require("../../utils/auth");
const UserRepository_1 = require("../../users/UserRepository");
const UserService_1 = require("../../users/UserService");
const { User } = require("../../db/models");
const router = express_1.default.Router();
const validateLogin = [
    (0, express_validator_1.check)("credential")
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Please provide a valid email or username."),
    (0, express_validator_1.check)("password")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a password."),
    validation_1.handleValidationErrors,
];
// Log in
router.post('/', validateLogin, (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { credential, password } = req.body;
    const repo = new UserRepository_1.UserRepository();
    const service = new UserService_1.UserService(repo);
    const user = yield service.login(credential, password);
    //const user = await User.login({ credential, password });
    if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
    }
    yield (0, auth_1.setTokenCookie)(res, user);
    return res.json({
        user,
    });
})));
// Log out
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
});
// Restore session user
router.get('/', auth_1.restoreUser, (req, res) => {
    const { user } = req;
    if (user) {
        return res.json({
            user: user.toSafeObject()
        });
    }
    else
        return res.json({});
});
exports.default = router;
//# sourceMappingURL=session.js.map