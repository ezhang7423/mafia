import React from "react";
import onlineIcon from "../icons/onlineIcon.png";

const ActivePlayers = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "52vh",
        left: "45vw",
      }}
    >
      <div className="theList">
        {props.users ? (
          <div>
            <h1>In Village:</h1>
            <h2>
              {Object.keys(props.users).length} / {props.total}{" "}
            </h2>
            <div className="theNames">
              <h2>
                {props.users.map((user) => {
                  return (
                    <div key={user.name} className="names">
                      {user.name}
                      <img src={onlineIcon} />
                    </div>
                  );
                })}
              </h2>
            </div>
          </div>
        ) : null}

        <style jsx>{`
          .theList {
            display: flex;
            flex-direction: row;
            color: white;
            font-size: 18px;
            -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: black;
          }

          .theNames {
            display: flex;
            align-items: center;
            font-size: 14px;
          }

          .name {
            display: flex;
            align-items: center;
          }

          .theNames img {
            padding-left: 10px;
          }

          .theList h1 {
            margin-bottom: 0px;
          }

          /*@media (min-width: 320px) and (max-width: 1200px) {
                    .textContainer {
                        display: none;
                    }
                }
                */
        `}</style>
      </div>
    </div>
  );
};

export default ActivePlayers;
