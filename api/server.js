const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const server = express();
const routes = require("./routes.js");
const { errHandler } = require("./middlewares.js");

server.use(express.json());
server.use(cors());
server.use(morgan("dev"));

server.get("/", (req, res) => res.status(200).json("erdogansad's api"));
server.use("/api", routes);

server.use(errHandler);

module.exports = server;
