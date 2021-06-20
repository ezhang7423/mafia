import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import getConfig from "next/config";
const publicRuntimeConfig = {};
if (getConfig()) {
  publicRuntimeConfig.ENDPOINT = getConfig().publicRuntimeConfig.ENDPOINT;
} else {
  publicRuntimeConfig.ENDPOINT = "https://s2-t4-mafia-backend.herokuapp.com";
}

import io from "socket.io-client";
import Sound from "react-sound";

// Styling
//import "./ChatLayout.scss";
import days from "./mafia_day.png";
import night from "./mafia_night.png";
var background = days;
var day = true;
var music = "Epilog_Ghostpocalypse.mp3";
var day_music = "Epilog_Ghostpocalypse.mp3";
var night_music = "Beyond_the_Lows.mp3";

// Components
import InfoBar from "./InfoBar.js";
import Input from "./Input.js";
import Messages from "./Messages.js";
import Poll from "../components/newpoll/newpoll.js";
import ActivePlayers from "../components/ActivePlayers.js";

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}

let socket;
const Chat = (props) => {
  const forceUpdate = useForceUpdate();
  // const [background, setBackground] = useState(days);
  const [myname, setMyname] = useState("");
  const [roomx, setRoomx] = useState("");
  const [users, setUsers] = useState("");
  const [total, setTotal] = useState("");
  const [numPeople, setnumPeople] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [dead, setDead] = useState(false);
  //const [day, setDay] = useState(true);

  const Router = useRouter(); // useRouter hook, gets information each time page rendered
  // router is an object!

  // custom hook that sets name and room everytime Router object changes
  // update can be caused by changes to prop and state
  // unmounting before component removed
  useEffect(() => {
    socket = io(publicRuntimeConfig.ENDPOINT);
    // but doesn't work on connection from port specified on npm run dev
    //  name, room, people;
    if (Router) {
      var { name, room, people } = Router.query;
    } else {
      var [name, room, people] = ["Storybook", "410", "42"];
    }
    setMyname(name); // if effect changes, include in [] to track the change
    setnumPeople(people);
    setRoomx(room); // or leave out [] entirely

    socket.emit(
      "join",
      { name: name, room: room, numplayers: people },
      (str) => {
        // if str isn't null, error has occured
        if (str) {
          alert(str);
          Router.push("/");
        }
      }
    );

    // necessary, or name will be null upon rejoin
    // name will be null upon rejoin because
    // socket connected to
    return () => {
      socket.disconnect();
    };
  }, [Router]); // reload effect when router changes

  useEffect(() => {
    // receive message event from server
    socket.on("message", (message) => {
      // console.log("received message.");
      setMessages((msgs) => {
        return [...msgs, message];
      });
    });
    socket.on("tostart", (totalamt) => {
      // console.log(totalamt);
      setTotal(totalamt);
    });
    socket.on("setdayn", () => {
      background = days;
    });
    socket.on("changeday", () => {
      if (day == true) {
        background = night;
        console.log("should be night");
        day = false;
        music = night_music;
      } else {
        background = days;
        console.log("should be day");
        day = true;
        music = day_music;
      }
      console.log("day: ", day);
      forceUpdate();
    });
    socket.on("kickedout", () => {
      console.log("im dead from chatlayout");
      setDead(true);
    });
    socket.on("roomData", (obj) => {
      // console.log("updating room data");
      // console.log(obj);
      setUsers(obj.users);
    });
  }, [Router]); // when router effect changes, need to make new useEffect object
  // or data won't update, obj returned will be null

  const sendMessage = (event) => {
    event.preventDefault();

    // if message isn't empty
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div>
      <Sound
        url={music}
        playStatus={Sound.status.PLAYING}
        autoLoad={true}
        loop={true}
      />
      <Head>
        <title>Chat Sign In</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <div
        className="outerContainer"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundImage: "url(" + background + ")",
          backgroundSize: "contain, cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "#000000",
        }}
      >
        <div className="container">
          <InfoBar room={roomx} />
          <Messages messages={messages} name={myname} />
          <Input
            disabled={dead}
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
        <Poll
          className="poll"
          disabled={dead}
          name={myname}
          room={roomx}
          socket={socket}
          style={{
            position: "absolute",
            top: "42vh",
            left: "75vw",
            background: "rgba(255, 255, 255, 0.7)",
            padding: "30px",
          }}
        />
        <ActivePlayers
          total={total}
          users={users}
          style={{
            position: "absolute",
            top: "10vh",
            left: "50vw",
            padding: "10px",
          }}
        />
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #ffadad;
          border-radius: 8px;
          height: 60%;
          width: 30%;
          margin-right: 60vw;
        }

        @media (min-width: 320px) and (max-width: 480px) {
          .outerContainer {
            height: 100%;
          }

          .container {
            width: 100%;
            height: 100%;
          }
        }

        @media (min-width: 480px) and (max-width: 1200px) {
          .container {
            width: 60%;
          }
        }

        .poll {
          position: absolute;
          top: 20vh;
          left: 40vw;
        }
      `}</style>
    </div>
  );
};

/*
<div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
*/

export default Chat;
