const JWT = require("jsonwebtoken");
const Mongoose = require("mongoose");
const User = Mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "you must log in" });
  }
  const token = authorization.replace("Bearer ", "");
  JWT.verify(token, "MY_SECRET", async (err, payload) => {
    if (err) {
      return res.status(401).send({ err: "you must loged in" });
    }
    const { userId } = payload;
    console.log(token);
    const user = await User.findById(userId);
    req.user = "user";
    next();
  });
};
