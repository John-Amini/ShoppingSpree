const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
import db from "../db/models"

const { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie
export const setTokenCookie = (res, user) => {
  // Create the token.
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) }, // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token cookie
  res.cookie("token", token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax",
  });

  return token;
};

export const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      // somehow failing on the await User.scope.findByPk
      req.user = await db.User.scope("currentUser").findByPk(id);
    } catch (e) {
      console.log(e)
      res.clearCookie("token");
      return next();
    }

    if (!req.user) res.clearCookie("token");
    return next();
  });
};

// If there is no current user, return an error
export const requireAuth = [
  restoreUser,
  function (req, res, next) {
    if (req.user) return next();

    const err = new Error('Unauthorized') as any;
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
  },
];
