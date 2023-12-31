const jwt = require("jsonwebtoken");

exports.authorize = async (req, res, next) => {
  try {
    // here we reading token
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).send("unauthorized");
    }

    const payload = await jwt.verify(token, "process.env.Secret_Key");
    console.log("paylaod is", payload);
    if (!payload) {
      return res.status(401).send("unauthorized");
    }

    req.userId = payload.userId;

    next();
  } catch (err) {
    console.log(err);
  }
};
