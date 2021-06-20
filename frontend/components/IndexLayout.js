import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Sound from "react-sound";
import Popup from "reactjs-popup";
import { useRouter } from "next/router";
import logo from "../components/betterlogo.png";
import getConfig from "next/config";
const publicRuntimeConfig = {};
if (getConfig()) {
  publicRuntimeConfig.ENDPOINT = getConfig().publicRuntimeConfig.ENDPOINT;
} else {
  publicRuntimeConfig.ENDPOINT = "https://s2-t4-mafia-backend.herokuapp.com";
}
import io from "socket.io-client";
//import music from "../components/Kool_Kats.mp3";

//import "./IndexLayout.scss";

var play = Sound.status.STOPPING;

function playMusic() {
  console.log("Music");
  if (play == Sound.status.STOPPED) {
    play = Sound.status.PLAYING;
    console.log("Now playing");
  } else {
    play = Sound.status.STOPPED;
    console.log("Now stopping");
  }
}

let socket;
const Layout = (props) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [numPeople, setnumPeople] = useState("");
  const [disable, setDisable] = useState(false);
  const [roomm, setRooms] = useState([]);
  const Router = useRouter(); // useRouter hook, gets information each time page rendered
  useEffect(() => {
    socket = io(publicRuntimeConfig.ENDPOINT);
    socket.emit("getrooms");
    socket.on("roomamt", (rooms) => {
      rooms = Object.keys(rooms);
      setRooms(rooms);
    });
    return () => {
      socket.disconnect();
    };
  });
  function checkPeople(event) {
    if (Number(event.target.value) < 4) {
      event.target.value = 4;
    }
    setnumPeople(event.target.value);
  }

  return (
    <div
      className="joinOuterContainer"
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        height: "100vh",
        alignItems: "center",
        backgroundImage: `url(${logo}), repeating-linear-gradient(-180deg, rgb(160, 10, 0) , rgb(160, 10, 0) 25%, black 100%)`,
        backgroundColor: "#000000",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Sound
        url="Kool_Kats.mp3"
        playStatus={Sound.status.PLAYING}
        loop={true}
      />
      <Head>
        <title>Chat Sign In</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <div className="joinInnerContainer">
        <div>
          <input
            style={{
              marginTop: "20vh",
            }}
            placeholder="User Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Room Number"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => {
              setRoom(event.target.value);
              // console.log(roomm);
              // console.log(roomm.includes(event.target.value));
              setDisable(roomm.includes(event.target.value));
            }}
          />
        </div>
        <div>
          <input
            placeholder="Amount of people"
            className="joinInput mt-20"
            type="number"
            style={{
              backgroundColor: disable ? "gray" : "darkred",
            }}
            disabled={disable}
            onChange={(event) => checkPeople(event)}
          />
        </div>

        <Link href={`/chat?name=${name}&room=${room}&people=${numPeople}`}>
          <button
            className="button mt-20"
            type="submit"
            onClick={(event) =>
              (setName(name.trim().toLowerCase()) &&
                setRoom(room.trim().toLowerCase()) &&
                !name) ||
              !room
                ? event.preventDefault()
                : null
            }
          >
            Join Game
          </button>
        </Link>
        <div>
          <button
            className="musicBoi"
            onClick={() => window.location.reload(false)}
          >
            Play Music
          </button>
        </div>
        <Popup
          trigger={
            <button className="rulesButton"> First time playing? </button>
          }
          modal
        >
          {(close) => (
            <div className="modal">
              <a className="close" onClick={close}>
                &times;
              </a>
              <div className="title"> How to Play Mafia </div>
              <div className="content">
                {" "}
                Welcome to the wonderful world of Mafia! We have snazzy suits,
                definitely-not-neckbeard fedoras, lap cats, and authentic
                Italian food. Well actually, because this is online, we don't
                have any of those. But what we DO have is the perfect,
                Corona-free social game about lying and murder. Fun for the
                whole family!
                <br />
                The game rules are so simple even grandpa can relive the roaring
                20's from the comfort of his recliner. Once a room has the max
                amount of players (determined by the creator of the room), the
                game will begin. You will be assigned one of two roles: villager
                or mafia.
                <br />
                If you are a villager, congradulations! Every day you will have
                the chance to hang a commie- I mean, suspected mafia, through
                the power of democracy. You won't know who the mafia are, and
                they will be other "villagers", so chat up the other players
                using chat or in an external voice chat to discover who's
                innocent and who has blood on their hands (and flowers). Simply
                click on the name of the person you wish to vote to death. BUT
                BE WARNED! Once you have cast your lot there's no turning back.
                <br />
                If you are assigned mafia, on the other hand, you get to indulge
                twice in the sweet taste of competely legal, not at all mob
                rule, democratically sanctioned murder. Once during the day,
                while you pose as a fellow villager, and once at night, where
                you immediately turn around and stab another villager in the
                back. BUT BE WARNED! Just like the villagers, you may only vote
                once in both the day and night votes. No taksie-backsies!
                <br />
                If a person recieves more than 50% of the total votes in either
                the day or the night, they will be haphazardly excecuted by Mr.
                Rope (or whatever method you prefer). If, on the other hand, no
                one recieves more than 50% of the votes, the all-mighty poll god
                will be displeased and will refuse to indulge your bloodlust. So
                be sure to coordinate with your fellow "villagers" or mafia to
                make each day and night count! If all the mafia die like the
                handsome devils they are, the villagers will win and reclaim
                that tasty pizza shop ominously facing the excecution field. If
                there as many villagers as the mafia, or if the mafia outnumber
                the villagers, then the villagers can say "arrivederci" to any
                hope they had of winning.
                <br /> <br />
                If you want to join a game, simply create a username, enter the
                room number, and then enter the amount of people playing.
                Because we operate on a "first come first murder" basis, the
                creator of the room has the ultimate say in how many people will
                be in the game, so don't worry if you're cat walks across the
                keyboard or if you were only half paying attention to the host
                and don't know how many people are playing. If you are creating
                a room, on the other hand, then double check that you want 5
                people and not 55! BE WARNED! You need a minimum of 4 people to
                play Mafia. Of course, you could always just join using 4
                different accounts, we won't judge.
                <br />
              </div>
              <div className="actions">
                <button
                  className="rulesButton"
                  onClick={() => {
                    close();
                  }}
                >
                  HAPPY KILLING! ^_^
                </button>
              </div>
            </div>
          )}
        </Popup>
        <style jsx>{`
          .joinInnerContainer {
            position: absolute;
            left: 39vw;
            top: 25vh;
            width: 25%;
          }

          .joinInput {
            border-radius: 0;
            border-color: black;
            padding: 15px 20px;
            width: 100%;
            background-color: darkred;
          }

          .heading {
            color: lightgrey;
            font-size: 2.5em;
            padding-bottom: 10px;
          }

          .button {
            color: white !important;
            text-transform: uppercase;
            text-decoration: none;
            background: red;
            padding: 20px;
            border-radius: 5px;
            display: inline-block;
            border: none;
            width: 100%;
          }

          .mt-20 {
            margin-top: 20px;
          }

          .musicBoi {
            color: black;
            background: #cfb53b;
            padding: 5px;
            display: inline-block;
            border: none;
            border-radius: 4px;
            width: 50%;
            margin-top: 20px;
          }

          .rulesButton {
            color: white;
            background: #86baff;
            padding: 5px;
            display: inline-block;
            border: none;
            border-radius: 4px;
            width: 50%;
            margin-top: 10px;
          }

          .modal {
            font-sze: 12px;
          }

          .modal > .title {
            width: 100%;
            border-bottom: 1px solid grey;
            font-size: 24px;
            text-align: center;
            padding: 5px;
          }

          .modal > .content {
            width: 100%;
            padding: 10px 5px;
            text-align: left;
            font-size: 14px;
          }

          .modal > .actions {
            width: 100%;
            padding: 10px 5px;
            margin: auto;
            text-align: center;
          }

          .modal > .close {
            cursor: pointer;
            position: absolute;
            display: block;
            padding: 2px 5px;
            line-height: 20px;
            right: -10px;
            top: -10px;
            font-size: 24px;
            background: #ffffff;
            border-radius: 18px;
            border: 1px solid #cfcece;
          }

          @media (min-width: 320px) and (max-width: 480px) {
            .joinOuterContainer {
              height: 100%;
            }

            .joinInnerContainer {
              width: 90%;
            }
          }

          button:focus {
            outline: 0;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Layout;
