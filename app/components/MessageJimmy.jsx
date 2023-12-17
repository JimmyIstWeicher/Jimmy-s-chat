import React from "react";
import Speech from "react-text-to-speech";
import { Play, Pause, X } from "react-feather";
const MessageJimmy = ({ children, lesenachricht }) => {
  const startBtn = <Play></Play>;
  const pauseBtn = <Pause></Pause>;
  const stopBtn = <X></X>;
  return (
    <div className="chat-message">
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-md max-w-xs mx-2 order-2 items-start">
          <div>
            <span className="px-4 py-2 rounded-3xl inline-block rounded-bl-none chat-bubble-accent">
              {children}
              <Speech
                text={lesenachricht}
                startBtn={startBtn}
                pauseBtn={pauseBtn}
                stopBtn={stopBtn}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageJimmy;
