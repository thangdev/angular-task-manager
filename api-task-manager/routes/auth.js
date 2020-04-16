const express = require("express");
const { User } = require("../db/models");

// Auth middleware to verify refresh access token

module.exports = async (req, res, next) => {
  try {
    // get refresh_token in header request
    const refreshToken = req.header("x-refresh-token");
    const _id = req.header("_id");
    const user = await User.findByIdAndToken(_id, refreshToken);
    if (!user)
      res.status(401).send({ error_code: 1, message: "User not exist!" });
    req.user_id = user._id
    req.userObject = user;
    req.refreshToken = refreshToken;
    let isSessionValid = false;
    for (let session of user.sessions) {
      if (session.token === refreshToken) {
        // check if the session has expirec
        if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
          // refresh token has not expired
          isSessionValid = true;
        }
      }
    }
    if (isSessionValid) {
      next();
    } else {
      res.send({
        error_code: 2,
        message: "the refresh token has expired or the session is invalid",
      });
    }
  } catch (error) {
    res.send(error);
  }
};
