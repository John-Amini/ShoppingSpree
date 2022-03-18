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
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const app_1 = __importDefault(require("../app"));
describe('User Endpoint', () => {
    let request;
    before(() => {
        request = (0, supertest_1.default)(app_1.default);
    });
    const username = Math.random().toString();
    const email = `${Math.random().toString()}@domain.com`;
    it('should allow users to signup', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post("/api/users")
            .send({
            username: username,
            email: email,
            password: "something",
        });
        (0, chai_1.expect)(res.body.user.username).to.be.eq(username);
        (0, chai_1.expect)(res.body.user.email).to.be.eq(email);
    }));
    it('should allow users to login - username', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post("/api/session")
            .send({
            credential: username,
            password: "something",
        });
        (0, chai_1.expect)(res.body.user.username).to.be.eq(username);
        (0, chai_1.expect)(res.body.user.email).to.be.eq(email);
    }));
    it('should allow users to login - email', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post("/api/session")
            .send({
            credential: email,
            password: "something",
        });
        (0, chai_1.expect)(res.body.user.username).to.be.eq(username);
        (0, chai_1.expect)(res.body.user.email).to.be.eq(email);
    }));
});
//# sourceMappingURL=UserRoute.integration.test.js.map