require("dotenv").config();
const jwt = require("jsonwebtoken");

const TOKEN_KEY = process.env.TOKEN_KEY || "__DEV_CHANGE_ME__";
if (!process.env.TOKEN_KEY) {
  console.warn(
    "WARNING: TOKEN_KEY is not set in .env — using a development fallback secret. Do not use in production."
  );
}

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};