const express = require("express");
const { find, insert } = require("./model.js");
const { credentialController, credentialEncoder, userNameController, authControl, tokenController } = require("./middlewares.js");

const server = express.Router();

server.get("/kullanicilar", tokenController, async (req, res, next) => {
  try {
    let query = await find();
    res.status(200).json(query);
  } catch (e) {
    next(e);
  }
});

server.post("/kayitol", credentialController, userNameController, credentialEncoder, async (req, res) => {
  try {
    let query = await insert(req.user);
    res.status(200).json({ ...query, username: req.body.username });
  } catch (e) {
    next(e);
  }
});

server.post("/giris", credentialController, authControl, async (req, res, next) => {
  try {
    res.status(200).json({ message: `welcome, ${req.body.username}; token: ${req.user.token}` });
  } catch (e) {
    next(e);
  }
});

module.exports = server;
