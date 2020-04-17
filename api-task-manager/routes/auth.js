const express = require("express");
const jwt = require("jsonwebtoken");

const { User } = require("../db/models");

module.exports = (req, res, next) => {
    const token = req.header('x-access-token')

    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if(err) res.status(401).send(err)
        req.user_id = decoded._id
        console.log('aaa')
        next()
    });
}
