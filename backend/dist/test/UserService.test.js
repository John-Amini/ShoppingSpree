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
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = require("../users/UserRepository");
const UserService_1 = require("../users/UserService");
const chai_1 = require("chai");
describe('User Flow', () => {
    let userService;
    before(() => {
        const userRepo = new UserRepository_1.UserRepository();
        userService = new UserService_1.UserService(userRepo);
    });
    const signupRandomUser = () => __awaiter(void 0, void 0, void 0, function* () {
        const username = Math.random().toString();
        const email = `${Math.random().toString()}@domain.com`;
        const user = yield userService.signup(username.toString(), email, "helloworld");
        return { username, email, password: 'helloworld', createdUser: user };
    });
    it('should allow users to signup', () => __awaiter(void 0, void 0, void 0, function* () {
        const { username, email, password, createdUser } = yield signupRandomUser();
        (0, chai_1.expect)(createdUser.username).to.be.eq(username);
        (0, chai_1.expect)(createdUser.email).to.be.eq(email);
    }));
    it('should allow users to login', () => __awaiter(void 0, void 0, void 0, function* () {
        const { username, email, password } = yield signupRandomUser();
        const signup = yield userService.login(username.toString(), password);
        (0, chai_1.expect)(signup.username).to.be.eq(username);
        (0, chai_1.expect)(signup.email).to.be.eq(email);
    }));
});
//# sourceMappingURL=UserService.test.js.map