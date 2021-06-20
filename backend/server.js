const express = require("express");
const http = require("http");
const app = express();
// const cors = require("cors");
let dev = process.env.DEV ? true : false;
const PORT = process.env.PORT || 8000;

const server = http.Server(app);
const io = require("socket.io")(server, {
  handlePreflightRequest: (req, res) => {
    console.log(req.headers);
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": "*", //or the specific origin you want to give access to,
      "Access-Control-Allow-Credentials": true,
    };
    res.writeHead(200, headers);
    res.end();
  },
});

io.origins("*:*");
const s = require("./socketsrc");

let NUMPLAYERS = 3;
if (dev) {
  NUMPLAYERS = 4;
} else {
  NUMPLAYERS = 4;
}

s.connect.init(io, NUMPLAYERS);
s.voting.init(io);
s.gamestate.init(io);
server.listen(PORT, () => {
  console.log("server running on port", PORT);
});
