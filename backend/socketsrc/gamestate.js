const helper = require("./helpers.js");

const { rooms, getUserFromName, gamestates, done } = require("./database.js");

function initState(user, names, io) {
  console.log("INIT STATE CALLED FOR", user.room);
  let mafia = helper.genMafia(names.length, names);
  io.to(user.room).emit("message", {
    user: "admin",
    text: `The game has started!`,
  });

  for (let m of mafia) {
    io.to(getUserFromName(m).id).emit("message", {
      user: "admin",
      text: `You are mafia...be quiet`,
    });
  }
  gamestates[user.room] = new helper.gamestate();
  gamestates[user.room].mafia = helper.transformVote(mafia);
  gamestates[user.room].gameStarted = true;
  vp = helper.transformVote(names);
  mp = helper.getVillagers(gamestates[user.room].mafia, vp);
  for (let v of JSON.parse(name(mp))) {
    io.to(getUserFromName(v).id).emit("message", {
      user: "admin",
      text: `You are a villager...find the mafia.`,
    });
  }
  io.to(user.room).emit("initgame", { mafiaPoll: mp, villagerPoll: vp });
  gamestates[user.room].players = vp;
  gamestates[user.room].villagers = mp;
  gamestates[user.room].ovillagers = JSON.parse(JSON.stringify(mp));
  gamestates[user.room].omafia = JSON.parse(
    JSON.stringify(gamestates[user.room].mafia)
  );
  console.log("The villagers are:");
  console.log(gamestates[user.room].villagers);
}

function resetVotes(room) {
  let objs = ["players", "villagers", "mafia"];
  for (let p of objs) {
    for (let i of gamestates[room][p]) {
      i.votes = 0;
    }
  }
}

function won(room) {
  if (Object.keys(gamestates[room].mafia).length == 0) {
    return "Villagers";
  }

  if (
    Object.keys(gamestates[room].mafia).length /
      Object.keys(gamestates[room].players).length >=
    0.5
  ) {
    return "Mafia";
  }
  return "";
}

function name(obj) {
  return JSON.stringify(
    obj.map((i) => {
      return i.name;
    })
  );
}

const gameloop = (io, room, last) => {
  if (last[room] != undefined && last[room] != gamestates[room].isDay) {
    console.log("SWITCH");
    console.log(gamestates[room]);
    if (won(room)) {
      delete last[room];
      io.to(room).emit("message", {
        user: "admin",
        text: `The ${won(room)} have won! The mafia were ${name(
          gamestates[room].omafia
        )}, and the villagers were ${name(gamestates[room].ovillagers)}`,
      });
      io.to(room).emit("setday");
      io.to(room).emit("setdayn");
      delete gamestates[room];
      done[room] = "boi"; //so another game doesn't start right away
      return;
    }
    resetVotes(room);
    io.to(room).emit("changeday");
    io.to(room).emit("changedayn", {
      mafiaPoll: gamestates[room].villagers,
      villagerPoll: gamestates[room].players,
    });
    gamestates[room].numofVotes = 0;
  }

  if (gamestates[room]) {
    last[room] = gamestates[room].isDay;
  }
};

function checkAll(io, last) {
  for (let room of rooms) {
    gameloop(io, room, last);
  }
}
module.exports = {
  init: function (io) {
    var last = {};
    setInterval(() => {
      checkAll(io, last);
    }, 500);
  },
  initState,
};
