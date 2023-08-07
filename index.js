const SECRET = "SCRECT";
const express = require("express");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const connectToDb = require("./db");
const Inventory = require("./model/Inventory");
const User = require("./model/User");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    if (!req.body || !req.body.username || !req.body.password) {
      console.log(req.body);
      return res.status(403).json({
        success: false,
        error: "Invalid credential",
      });
    }

    const loginUser = await User.find({
      username: req.body.username,
      password: req.body.password,
    });

    if (!loginUser) {
      return res.status(401).json({
        success: false,
        error: "Wrong username or password",
      });
    }

    try {
      //Creating jwt token
      const token = jwt.sign({ user: req.body.username }, SECRET, {
        expiresIn: "1d",
      });
      return res.status(200).json({
        success: true,
        token,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }
  })
);

app.use(
  asyncHandler(async (req, res, next) => {
    const authorizationClient = req.headers["authorization"];
    console.log(req);
    const token = authorizationClient && authorizationClient.split(" ")[1];

    if (!token)
      return res.status(401).json({
        success: false,
        msg: "Unauthorized access",
        headers: req.headers,
      });

    try {
      jwt.verify(token, SECRET);
      return next();
    } catch (e) {
      return res.status(403).json({
        success: false,
        msg: "Bad token",
      });
    }
  })
);

app.get(
  "/inventory",
  asyncHandler(async (req, res) => {
    let inventories;
    if (req.query.low) {
      inventories = await Inventory.find({
        instock: { $lt: 100 },
      });
    } else {
      inventories = await Inventory.find({});
    }
    return res.status(200).json({ inventories });
  })
);

connectToDb().then(() => {
  app.listen(3000, () => {
    console.log("App is running at 3000");
  });
});
