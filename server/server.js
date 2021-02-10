require("./User");

const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const cors = require("cors");
const corsAnywhere = require("cors-anywhere");
const mongoose = require("mongoose");
const authRoute = require("./authRoutes");
const isAuth = require("./isAuth");
const app = express();

mongoose.connect(
  "mongodb+srv://newUser65:KcPtZ9TjAOFARhJZ@emi.lhsqe.mongodb.net/<dbname>?retryWrites=true&w=majority",
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
mongoose.connection.on("connected", () => {
  console.log("connected to mongo instance");
});
mongoose.connection.on("error", () => {
  console.log("error to connet to mongo instance");
});

// var host = process.env.HOST || '0.0.0.0';

// var port = process.env.PORT || 8080;
// corsAnywhere.createServer({
//     originWhitelist: [], // Allow all origins
//     requireHeader: ['origin', 'x-requested-with'],
//     removeHeaders: ['cookie', 'cookie2']
// }).listen(port, host, function() {
//     console.log('Running CORS Anywhere on ' + host + ':' + port);
// })

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(authRoute);

app.get("/emi/emi", (req, res) => {
  res.send("ok");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
