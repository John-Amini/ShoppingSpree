import express from "express";
import { check } from "express-validator";
import asyncHandler from "express-async-handler";

import { handleValidationErrors } from "../../utils/validation";
import { setTokenCookie, restoreUser } from "../../utils/auth";
import { UserRepository } from "../../users/UserRepository";
import { UserService } from "../../users/UserService";
const { User } = require("../../db/models");

const router = express.Router();

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

// Log in
router.post(
  '/',
  validateLogin,
  asyncHandler(async (req, res, next) => {
      const { credential, password } = req.body;

      const repo = new UserRepository();
      const service = new UserService(repo);

      const user = await service.login(credential, password);

      //const user = await User.login({ credential, password });

    if (user !== null) {

      const err = new Error('Login failed') as any;
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);

export default router;
