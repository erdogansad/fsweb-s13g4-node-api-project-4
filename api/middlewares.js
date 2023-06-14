const { findByName, findToken, update } = require("./model");
const { nanoid } = require("nanoid");
const bcryptjs = require("bcryptjs");

const tokenController = async (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    token = token.replace("Bearer ", "");
    try {
      let finder = await findToken(token);
      finder ? next() : next({ status: 403, message: "auth token is invalid." });
    } catch (e) {
      next(e);
    }
  } else {
    next({ status: 403, message: "auth token is required." });
  }
};

const userNameController = async (req, res, next) => {
  try {
    let user = await findByName(req.body.username);
    user ? next({ status: 303, message: "username is already exist" }) : next();
  } catch (e) {
    next(e);
  }
};

const credentialEncoder = async (req, res, next) => {
  try {
    req.user = { username: req.body.username, password: await bcryptjs.hash(req.body.password, 8) };
    next();
  } catch (e) {
    next(e);
  }
};

const credentialController = (req, res, next) => {
  req.body.username && req.body.password ? next() : next({ status: 400, message: "username and password not be null" });
};

const authControl = async (req, res, next) => {
  try {
    req.user = await findByName(req.body.username);
    if (req.user) {
      let compare = await bcryptjs.compare(req.body.password, req.user.password);
      if (compare) {
        req.user.token = nanoid(32);
        await update(req.body.username, req.user);
        next();
      } else {
        next({ status: 401, message: "username or password invalid" });
      }
    } else {
      next({ status: 401, message: "username or password invalid" });
    }
  } catch (e) {
    next(e);
  }
};

const errHandler = (err, req, res, next) => {
  res.headersSent ? next(err) : res.status(err.status || 500).json({ message: err.message || "internal server error." });
};

module.exports = {
  tokenController,
  userNameController,
  credentialEncoder,
  credentialController,
  authControl,
  errHandler,
};
