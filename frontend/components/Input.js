import React from "react";

// event object contains info about details of the event
const Input = (props) => {
  return (
    <form className="form">
      <input
        disabled={props.disabled}
        className="input"
        type="text"
        placeholder="Type a message..."
        value={props.message}
        onChange={(event) => props.setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? props.sendMessage(event) : null
        }
      />
      <style jsx>{`
        .form {
          display: flex;
          border-top: 2px solid black;
        }

        .input {
          border: none;
          border-radius: 0;
          padding: 3%;
          width: 80%;
          font-size: 1em;
          background: #FFADAD;
        }

        input:focus,
        textarea:focus,
        select:focus {
          outline: none;
        }

        .sendButton {
          color: white !important;
          text-transform: uppercase;
          text-decoration: none;
          background: darkred;
          padding: 20px;
          display: inline-block;
          border: none;
          width: 20%;
        }
      `}</style>
      <button
        className="sendButton"
        onClick={(event) => props.sendMessage(event)}
      >
        Send
      </button>
    </form>
  );
};

export default Input;
