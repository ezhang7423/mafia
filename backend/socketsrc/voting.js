const helper = require("./helpers.js");
const {
  gamestates,
  getUserFromName,
  getPlayerIndex,
} = require("./database.js");
function kill(msg, gamestate, io) {
  console.log("KICK OUT SOMEONE");
  console.log(getUserFromName(msg));
  io.to(getUserFromName(msg).id).emit("kickedout");
  io.to(getUserFromName(msg).id).emit("message", {
    user: "admin",
    text: `You are dead!`,
  });
  gamestate.players = helper.splitElem(gamestate.players, msg);
  gamestate.mafia = helper.splitElem(gamestate.mafia, msg);
  gamestate.villagers = helper.splitElem(gamestate.villagers, msg);
  // checkDone(gamestate);
}

function checkDone(gamestate) {
  if (gamestate.isDay) {
    if (gamestate.numofVotes >= gamestate.players.length) {
      console.log("SWITCHING TIME");
      gamestate.isDay = !gamestate.isDay;
      return true;
    }
    return false;
  } else {
    if (gamestate.numofVotes >= gamestate.mafia.length) {
      console.log("SWITCHING TIME");
      gamestate.isDay = !gamestate.isDay;
      return true;
    }
    return false;
  }
}
module.exports = {
  init: function (io) {
    console.log("VOTING INITALIZED!");
    io.on("connection", (socket) => {
      socket.on("myvotecastfor", (msge) => {
        msg = msge.name;
        console.log("VOTE CAST FROM", msg, "IN ROOM", msge.room);

        let pindex = getPlayerIndex(msg, msge.room);
        gamestates[msge.room].numofVotes++;

        try {
          gamestates[msge.room].players[pindex].votes++;
        } catch (TypeError) {
          console.log("SWITCHING TIME");
          gamestates[msge.room].isDay = !gamestates[msge.room].isDay;
          return;
        }
        if (gamestates[msge.room].isDay) {
          if (
            gamestates[msge.room].players[pindex].votes >
            Math.floor(gamestates[msge.room].players.length / 2)
          ) {
            kill(msg, gamestates[msge.room], io);
          }
        } else {
          if (
            gamestates[msge.room].players[pindex].votes >
            Math.floor(gamestates[msge.room].mafia.length / 2)
          ) {
            kill(msg, gamestates[msge.room], io);
          }
        }
        checkDone(gamestates[msge.room]);
        console.log(gamestates[msge.room]);
      });
    });
  },
};
