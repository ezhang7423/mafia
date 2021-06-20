const {
  users,
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  gamestates,
  done,
  roomAmt,
} = require("./database.js");
const { initState } = require("./gamestate.js");
const helpers = require("./helpers.js");

module.exports = {
  init: function (io, NUMPLAYERS) {
    var sockets = {};

    io.on("connection", (socket) => {
      sockets[socket.id] = socket;
      socket.on("getrooms", () => {
        console.log(roomAmt);
        socket.emit("roomamt", roomAmt);
      });
      socket.on("join", (obj, callback) => {
        if (!obj["name"]) {
          return;
        }

        console.log("GAMESTATES:", gamestates);
        if (obj.name == "") {
          obj.name = "something";
        }
        const { error, user } = addUser({
          id: socket.id,
          name: obj.name,
          room: obj.room,
        });
        if (!roomAmt[obj.room]) {
          roomAmt[obj.room] = Number(obj.numplayers);
          console.log(roomAmt);
          console.log(roomAmt[obj.room]);
        }
        if (error) {
          console.log(error);
          return;
        }
        try {
          // helpers.clearState(io);
          setInterval(function () {
            if (
              !gamestates[user.room] && //game hasn't started
              roomAmt[user.room] && // roomamt has been set
              getUsersInRoom(user.room).length >= roomAmt[user.room] && // amt of players reached
              !done[user.room] //room finished game
            ) {
              console.log("STARTED GAME IN ROOM", user.room);
              names = getUsersInRoom(user.room).map((item) => {
                return item.name;
              });
              initState(user, names, io);
            }
          }, 500);
          // }
          // gamestate.refRoom = user.room;
        } catch (error) {
          console.log(error);
        }

        console.log(`Adding ${obj.name} to room ${obj.room}`);
        if (error) {
          return callback(error);
        }
        socket.emit("message", {
          user: "admin",
          text: `${user.name}, welcome to the room ${user.room}!`,
        });
        socket.broadcast.to(user.room).emit("message", {
          user: "admin",
          text: `${user.name} has joined the room.`,
        });
        socket.emit("keeptrackofnames", user.name);
        socket.join(user.room); // user.room is the parsed room name from user

        io.to(user.room).emit("roomData", {
          room: user.room,
          users: getUsersInRoom(user.room),
        });
        callback();
      });
      socket.on("getstatus", (room) => {
        socket.emit("tostart", roomAmt[room]);
        if (gamestates[room]) {
          console.log(gamestates[room].gameStarted);
        }
        if (gamestates[room] && gamestates[room].gameStarted) {
          console.log("GAME HAS STARTED");
          socket.emit("initgame", {
            mafiaPoll: gamestates[room].villagers,
            villagerPoll: gamestates[room].players,
          });
        }
      });

      socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit("message", { user: user.name, text: message });
        callback();
      });

      socket.on("disconnect", () => {
        const user = removeUser(socket.id);
        if (user) {
          io.to(user.room).emit("message", {
            user: "admin",
            text: `${user.name} has left.`,
          });
          io.to(user.room).emit("roomData", {
            room: user.room,
            users: getUsersInRoom(user.room),
          });
        }

        socket.disconnect();
      });
    });
  },
};
