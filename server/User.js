const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

mongoose.model("User", userSchema);

const user = {
  name: "kevin",
  active: true,
  cart: ["oo"],
  purchases: [],
};
