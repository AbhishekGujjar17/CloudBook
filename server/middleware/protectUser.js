const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const JWT_SECRET = process.env.JWT_SECRET;

const protectUser = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    res
      .status(401)
      .json({ message: "Pleases authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Please authenticate using a valid token" });
  }
};

module.exports = protectUser;
