import React from "react";

import ReactEmoji from "react-emoji";

// event object contains info about details of the event
const Message = (props) => {
  let isSentByCurrentUser = false;
  const trimmedName = props.name.trim().toLowerCase();

  if (props.message.user === trimmedName) {
    isSentByCurrentUser = true;
  }

  // JSX is an extension to javascript that allows for html to be
  // stored in variables/return values
  // normally, we would use the class tag to assign CSS properties
  // here, it is JSX syntax, which uses className instead

  // differntiate chat elemnts between sent text and received text
  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{trimmedName}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">
          {ReactEmoji.emojify(props.message.text)}
        </p>
      </div>
      <style jsx>{`
        .messageBox {
          background: #f3f3f3;
          border-radius: 20px;
          padding: 5px 20px;
          color: white;
          display: inline-block;
          max-width: 80%;
        }

        .messageText {
          width: 100%;
          letter-spacing: 0;
          float: left;
          font-size: 0.8em;
          word-wrap: break-word;
        }

        .messageContainer {
          display: flex;
          justify-content: flex-end;
          padding: 0;
          margin: 10px;
        }

        .sentText {
          display: flex;
          align-items: center;
          font-family: Helvetica;
          font-size: 0.8em;
          color: #828282;
          letter-spacing: 0.3px;
        }

        .pr-10 {
          padding-right: 5px;
        }

        .justifyEnd {
          justify-content: flex-end;
        }

        .colorWhite {
          color: white;
        }

        .backgroundBlue {
          background: darkgrey;
        }
      `}</style>
    </div>
  ) : (
    (props.message.user === "admin") ? (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">
          {ReactEmoji.emojify(props.message.text)}
        </p>
      </div>
      <p className="sentText pl-10">{props.message.user}</p>
      <style jsx>{`
        .messageBox {
          background: #f3f3f3;
          border-radius: 20px;
          padding: 5px 20px;
          color: white;
          display: inline-block;
          max-width: 80%;
        }

        .messageText {
          width: 100%;
          letter-spacing: 0;
          float: left;
          font-size: 0.8em;
          word-wrap: break-word;
        }

        .messageContainer {
          display: flex;
          justify-content: flex-end;
          padding: 0;
          margin: 10px;
        }

        .sentText {
          display: flex;
          align-items: center;
          font-family: Helvetica;
          font-size: 0.8em;
          color: #828282;
          letter-spacing: 0.3px;
        }

        .justifyStart {
          justify-content: flex-start;
        }

        .colorDark {
          color: black;
        }

        .backgroundLight {
          background: #86BAFF;
        }
      `}</style>
    </div>
    ) : (
      <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">
          {ReactEmoji.emojify(props.message.text)}
        </p>
      </div>
      <p className="sentText pl-10">{props.message.user}</p>
      <style jsx>{`
        .messageBox {
          background: #f3f3f3;
          border-radius: 20px;
          padding: 5px 20px;
          color: white;
          display: inline-block;
          max-width: 80%;
        }

        .messageText {
          width: 100%;
          letter-spacing: 0;
          float: left;
          font-size: 0.8em;
          word-wrap: break-word;
        }

        .messageContainer {
          display: flex;
          justify-content: flex-end;
          padding: 0;
          margin: 10px;
        }

        .sentText {
          display: flex;
          align-items: center;
          font-family: Helvetica;
          font-size: 0.8em;
          color: #828282;
          letter-spacing: 0.3px;
        }

        .justifyStart {
          justify-content: flex-start;
        }

        .colorDark {
          color: black;
        }

        .backgroundLight {
          background: #f3f3f3;
        }
      `}</style>
    </div>
    )
  );
};

export default Message;
