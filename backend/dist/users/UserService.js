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
exports.UserService = void 0;
const auto_bind_1 = __importDefault(require("auto-bind"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
        (0, auto_bind_1.default)(this);
    }
    login(credential, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findByUsernameOrEmail(credential);
            if (user && bcryptjs_1.default.compareSync(password, user.hashedPassword.toString())) {
                return this.userRepo.findByPk(user.id);
            }
        });
    }
    signup(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepo.create(username, email, password);
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map