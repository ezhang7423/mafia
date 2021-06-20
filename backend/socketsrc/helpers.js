class gamestate {
  constructor() {
    this.isDay = true;
    this.gameEnded = false;
    this.gameStarted = false;
    this.players = []; //names, votes
    this.villagers = [];
    this.mafia = [];
    this.count = 0; //psuedo coun
    this.numofVotes = 0;
    this.omafia = [];
    this.ovillagers = [];
  }
}

module.exports = {
  splitElem: function (obj, msg) {
    for (let [i, x] of obj.entries()) {
      if (x.name == msg) {
        obj.splice(i, 1);
      }
    }
    return obj;
  },
  gamestate: gamestate,
  clearState: function (io) {
    console.log("resetting everything");
    gamestate.players = [];
    gamestate.villagers = [];
    gamestate.mafia = [];
    gamestate.count = 0;
    gamestate.numofVotes = 0;
    gamestate.isDay = true;
    gamestate.gameEnded = false;
    io.emit("setday"); // to fix
  },

  getRandomInt: function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  },

  genMafia: function (num, names) {
    if (isNaN(parseInt(num)) || num > 99 || num < 4) {
      console.log("invalid num");
      return;
    }

    let numMafia = Math.ceil((num - 3) / 2);

    let mafia = [];
    for (let x = 0; x < numMafia; x++) {
      mafia.push(names[module.exports.getRandomInt(num)]);
    }
    console.log("The mafia are:");
    console.log(mafia);
    return mafia;
  },

  getVillagers: function (mafia, names) {
    let res = [];
    for (let i of names) {
      ine = false;
      for (let j of mafia) {
        if (i.name == j.name) {
          ine = true;
          break;
        }
      }
      if (!ine) {
        res.push(i);
      }
    }
    return res;
  },

  transformVote: function (names) {
    let res = [];
    for (let x of names) {
      res.push({ name: x, votes: 0 });
    }
    return res;
  },
};
