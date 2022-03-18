import express from "express";
import { check } from "express-validator";
import asyncHandler from "express-async-handler";

import { handleValidationErrors } from "../../utils/validation";
import { setTokenCookie, requireAuth } from "../../utils/auth";
import { UserRepository } from "../../users/UserRepository";
import { UserService } from "../../users/UserService";
const { User } = require("../../db/models");

export const router = express.Router();

export const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

// Sign up
router.post(
  '',
  validateSignup,
    asyncHandler(async (req, res) => {

    const { email, password, username } = req.body;
    const userService = new UserService(new UserRepository())

    const user = await userService.signup(username, email, password);

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

export default router;
