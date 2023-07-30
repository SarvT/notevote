const jwt = require("jsonwebtoken");

const JWT_SECRET = "dsjshbkagigaicaxkdgi";

const profile = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(500).send("No authentication token provided");
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;

    next();
  } catch (error) {
    res.status(502);
  }
};

module.exports = profile;
