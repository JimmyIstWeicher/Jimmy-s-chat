import React, { useState, useEffect } from "react";
import { Play, Pause, X } from "react-feather";
import TextToSpeech from "./TextToSpeech"; // Fix the import statement to match the actual component name

const MessageJimmy = ({ children, lesenachricht }) => {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if 'speechSynthesis' is supported in the window object
    if ('speechSynthesis' in window) {
      setIsSupported(true);
    } else {
      // Speech Synthesis Not Supported 😣
      setIsSupported(false);
      alert("Sorry, your browser doesn't support text to speech!");
    }
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <div className="chat-message">
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-md max-w-xs mx-2 order-2 items-start">
          <div>
            <span className="px-4 py-2 rounded-3xl inline-block rounded-bl-none chat-bubble-accent">
              {children}
              <br />
              {isSupported ? <TextToSpeech text={lesenachricht} /> : null}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageJimmy;
