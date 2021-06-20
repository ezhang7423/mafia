import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";

// messages is the box containing message components
// draws message components from the messages array in chat.js
// unique to each chat room
const Messages = (props) => {
  return (
    <ScrollToBottom className="messages">
      {props.messages.map((message, i) => {
        return (
          <div key={i}>
            <Message message={message} name={props.name} />
          </div>
        );
      })}
      <style jsx global>
        {`
           {
            .messages {
              padding: 2%;
              overflow: auto;
              flex: auto;
            }
          }
        `}
      </style>
    </ScrollToBottom>
  );
};

export default Messages;
