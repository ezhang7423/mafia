import React, { Component } from "react";
import { useRouter } from "next/router";
import { Button, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";
import lightTheme from "./lightTheme";
import darkTheme from "./darkTheme";
import io from "socket.io-client";

const day = 1;
const night = 0;
// const socket = io("https://s2-t4-mafia-backend.herokuapp.com");
// const socket = io("http://localhost:8000");
let socket;

function getJsonFromUrl(url) {
  if (!url) url = location.search;
  var query = url.substr(1);
  var result = {};
  query.split("&").forEach(function (part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}

class newpoll extends Component {
  setUpSocket() {
    socket.emit("getstatus", this.state.room, (started) => {
      // console.log(started);
    });

    socket.on("setday", () => {
      this.setState({ ready: false });
    });

    socket.on("initgame", this.updateGame);

    socket.on("changedayn", (names) => {
      console.log("change dayn received");
      this.setState({ voted: false });
      this.setState({ time: 1 - this.state.time });
      this.updateGame(names);
    });

    socket.on("kickedout", () => {
      this.setState({ ready: false });
    });
  }

  updateGame = (names) => {
    if (this.state.time == day) {
      console.log("daytime");
      this.setState({ ready: true });
      this.setState(names);
    } else {
      console.log("nightime");

      let vils = names.mafiaPoll.map((item) => {
        return item.name;
      });

      // console.log("vils: ", vils);

      // console.log("myname:", this.state.myname);

      if (!vils.includes(this.state.myname)) {
        this.setState({ ready: true });
        this.setState(names);
      } else {
        this.setState({ ready: false });
      }
    }
  };

  constructor(props) {
    super(props);
    let getSocket = setInterval(() => {
      socket = this.props.socket;
      if (socket) {
        this.setUpSocket();
        clearInterval(getSocket);
      }
    }, 500);

    this.state = {
      myname: this.props.name,
      room: this.props.room,
      timestamp: "na",
      villagerPoll: [],
      mafiaPoll: [],
      names: [],
      time: day,
      voted: false,
      ready: false,
    };
    this.updateVote = this.updateVote.bind(this);
  }

  updateVote() {
    if (this.state.time === day) {
      this.setState({ time: night });
      this.setState({ voted: false });
      this.setState({
        villagerPoll: vp,
      });
    } else {
      this.setState({ time: day });
      this.setState({ voted: false });
      this.setState({
        mafiaPoll: mp,
      });
    }
  }

  componentDidMount() {
    let bois = getJsonFromUrl(new URL(window.location.href).search);
    this.setState({
      myname: bois.name,
      room: bois.room,
    });
  }

  villagerVote(i) {
    let player = [...this.state.villagerPoll];
    this.setState({ villagerPoll: player });
    this.setState({ voted: true });
    console.log(this.state.villagerPoll[i]);

    socket.emit("myvotecastfor", {
      ...this.state.villagerPoll[i],
      room: this.state.room,
    });
  }

  mafiaVote(i) {
    let player = [...this.state.mafiaPoll];
    this.setState({ mafia: player });
    this.setState({ voted: true });
    socket.emit("myvotecastfor", {
      ...this.state.villagerPoll[i],
      room: this.state.room,
    });
  }

  render() {
    const { time } = this.state;
    if (this.state.ready && !this.props.disabled) {
      if (time) {
        return (
          <div
            style={{
              position: "absolute",
              top: "42vh",
              left: "75vw",
              background: "rgba(255, 255, 255, 0.7)",
              padding: "30px",
            }}
          >
            <ThemeProvider theme={lightTheme}>
              <Typography variant="h5" color="primary">
                Who are the mafia?
              </Typography>
              <div className="villagerPoll">
                {this.state.villagerPoll.map((players, i) => (
                  <div key={i} className="player">
                    <Button
                      variant="contained"
                      disabled={this.state.voted}
                      color="primary"
                      onClick={this.villagerVote.bind(this, i)}
                    >
                      {players.name}
                    </Button>
                  </div>
                ))}
              </div>
            </ThemeProvider>
          </div>
        );
      } else {
        return (
          <div
            style={{
              position: "absolute",
              top: "42vh",
              left: "75vw",
              background: "rgba(255, 255, 255, 0.7)",
              padding: this.state.ready ? "30px" : "0px",
            }}
          >
            <ThemeProvider theme={darkTheme}>
              <Typography variant="h5" color="secondary">
                Who would you like to kill?
              </Typography>
              <div className="mafiaPoll">
                {this.state.mafiaPoll.map((players, i) => (
                  <div key={i} className="player">
                    <Button
                      variant="contained"
                      disabled={this.state.voted}
                      color="secondary"
                      onClick={this.mafiaVote.bind(this, i)}
                    >
                      {players.name}
                    </Button>
                  </div>
                ))}
              </div>
            </ThemeProvider>
          </div>
        );
      }
    } else {
      return <div></div>;
    }
  }
}
export default newpoll;
