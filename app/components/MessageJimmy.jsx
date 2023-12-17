import React, { useState, useEffect } from "react";
import { Play, Pause, X } from "react-feather";

const MessageJimmy = ({ children, lesenachricht }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    if (isPlaying) {
      const speech = new SpeechSynthesisUtterance(lesenachricht);
      speech.onend = () => {
        setIsPlaying(false);
      };
      speech.onerror = () => {
        setIsPlaying(false);
      };
      setUtterance(speech);
      speechSynthesis.speak(speech);
    } else if (utterance) {
      // Stopping speech if the component unmounts or isPlaying becomes false
      speechSynthesis.cancel();
    }

    return () => {
      // Cleanup: Cancel speech when the component unmounts
      if (utterance) {
        speechSynthesis.cancel();
      }
    };
  }, [isPlaying, utterance, lesenachricht]);

  const togglePlayback = () => {
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <div className="chat-message">
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-md max-w-xs mx-2 order-2 items-start">
          <div>
            <span className="px-4 py-2 rounded-3xl inline-block rounded-bl-none chat-bubble-accent">
              {children}
            </span>
          </div>
          <button onClick={togglePlayback}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageJimmy;
