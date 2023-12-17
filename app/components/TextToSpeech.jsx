import React, { useState, useEffect } from "react";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { IconContext } from "react-icons";

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE";

    // Set the onend event to handle when speech finishes
    u.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    // Set the voice
    speechSynthesis.getVoices().forEach(function (voice, index) {
      console.log(voice.lang);

      if (
        (voice.lang === "de-DE" && voice.name.toLowerCase().includes("male")) ||
        voice.name.toLowerCase().includes("killian")
      ) {
        utterance.voice = voice;
      }
    });

    if (isPaused) {
      synth.resume();
    } else {
      synth.speak(utterance);
    }

    setIsPaused(false);
    setIsPlaying(true);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
    setIsPlaying(false);
  };

  return (
    <IconContext.Provider
      value={{ size: "1.5em", className: "global-class-name" }}
    >
      <div className="flex items-center justify-start gap-3">
        {isPlaying ? (
          <button onClick={handlePause}>
            <FaPause />{" "}
          </button>
        ) : (
          <button onClick={handlePlay}>
            <FaPlay />
          </button>
        )}
        <button onClick={handleStop}>
          <FaStop />
        </button>
      </div>
    </IconContext.Provider>
  );
};

export default TextToSpeech;
