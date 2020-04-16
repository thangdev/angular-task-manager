const express = require("express");
const router = express.Router();
const { User } = require("../db/models");
const auth = require("./auth");

// User Register
router.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const userRecord = await newUser.save();
    const refreshToken = await newUser.createSession();
    const accessToken = await newUser.generateAccessAuthToken();
    res.header("x-refresh-token", refreshToken);
    res.header("x-access-token", accessToken);
    res.status(200).send(userRecord);
  } catch (error) {
    res.status(500).send(error);
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findByCredentials(email, password);
    if (!user)
      res.status(400).send({ error_code: 1, message: "User is not exist!" });
    const refreshToken = await user.createSession();
    const accessToken = await user.generateAccessAuthToken();
    res.header("x-refresh-token", refreshToken);
    res.header("x-access-token", accessToken);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Generate access token
router.get("/me/access-token", auth, async (req, res) => {
  try {
    const accessToken = await req.userObject.generateAccessAuthToken();
    res.header("x-access-token", accessToken).send({ accessToken });
  } catch (error) {
      res.status(400).send(error)
  }
});

module.exports = router;
