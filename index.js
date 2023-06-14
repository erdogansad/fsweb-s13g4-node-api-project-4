require("dotenv").config();
const server = require("./api/server.js");

server.listen(process.env.PORT, () => console.log(`listening at http://localhost:${process.env.PORT}`));
