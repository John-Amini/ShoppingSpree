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
exports.requireAuth = exports.restoreUser = exports.setTokenCookie = void 0;
const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { User } = require("../db/models");
const { secret, expiresIn } = jwtConfig;
// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    const token = jwt.sign({ data: user.toSafeObject() }, secret, { expiresIn: parseInt(expiresIn) });
    const isProduction = process.env.NODE_ENV === "production";
    // Set the token cookie
    res.cookie("token", token, {
        maxAge: expiresIn * 1000,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax",
    });
    return token;
};
exports.setTokenCookie = setTokenCookie;
const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    return jwt.verify(token, secret, null, (err, jwtPayload) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return next();
        }
        try {
            const { id } = jwtPayload.data;
            req.user = yield User.scope("currentUser").findByPk(id);
        }
        catch (e) {
            res.clearCookie("token");
            return next();
        }
        if (!req.user)
            res.clearCookie("token");
        return next();
    }));
};
exports.restoreUser = restoreUser;
// If there is no current user, return an error
exports.requireAuth = [
    exports.restoreUser,
    function (req, res, next) {
        if (req.user)
            return next();
        const err = new Error('Unauthorized');
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 401;
        return next(err);
    },
];
//# sourceMappingURL=auth.js.map