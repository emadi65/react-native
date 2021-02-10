const mongoose = require("mongoose");
const User = mongoose.model("User");
const router = require("express").Router();
const JWT = require("jsonwebtoken");

router.post("/api/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    const token = JWT.sign({ userId: user._id }, "MY_SECRET");
    res.send({ token });
    user.save();
  } catch (err) {
    console.log(err);
  }
});

router.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const token = JWT.sign(
        { userId: user._id, username: user.username },
        "MY_SECRET"
      );

      res.send({ token, username: user.username });
    } else {
      res.status(404).send({ error: "you have to log in" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
