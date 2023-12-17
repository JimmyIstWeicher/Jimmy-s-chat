"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronRight, Send, RefreshCcw } from "react-feather";
import Profile from "./components/Profile";
import MessageJimmy from "./components/MessageJimmy";
import MessageUser from "./components/MessageUser";

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [messages, setMessages] = useState([
    { role: "user", message: "Ich bitte um ein Gespräch mit Jimmy" },
  ]);

  const connection = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("wss://jimmy-chat.onrender.com/");

    // Connection opened
    socket.addEventListener("open", () => {
      console.log("Connection established");
    });

    // Listen for messages
    socket.addEventListener("message", (event) => {
      const message = event.data;
      console.log(event.data)
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "jimmy", message: message },
      ]);
    });

    connection.current = socket;

    return () => {
      if (connection.current) {
        connection.current.close();
      }
    };
  }, []);

  const reload = () => {
    console.log("test");
    location.reload();
  };

  const handleSendMessage = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const inputElement = document.getElementById(
      "messageInput"
    ) as HTMLInputElement;

    if (inputElement && inputElement.value.trim() !== "") {
      const message = inputElement.value.trim();
      console.log(message);

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", message: message },
      ]);
      if (connection.current) {
        connection.current.send(message);
      }
      inputElement.value = "";
    }
    setValue("");
  };

  // run this function from an event handler or an effect to execute scroll

  return (
    <div className="h-[100svh] flex-1 p-2 sm:p-6 justify-between flex flex-col bg-base-100">
      <Profile />
      <div
        id="messages"
        className=" flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        {messages.map((message, index) =>
          message.role === "jimmy" ? (
            <MessageJimmy key={index}>{message.message}</MessageJimmy>
          ) : (
            <MessageUser key={index}>{message.message}</MessageUser>
          )
        )}
      </div>
      <div className="border-t-2 border-neutral px-2 pt-4 mb-2">
        <div className="relative flex">
          <form
            onSubmit={handleSendMessage}
            className=" flex items-center justify-center w-screen"
          >
            {messages.length > 1 ? (
              <textarea
                value={value}
                cols={1}
                onChange={(e) => setValue(e.target.value)}
                id="messageInput"
                placeholder="Schreibe deine Nachricht!"
                className="w-full focus:outline-none glass bg-base-100 border-1 focus:shadow-sm pl-5 rounded-3xl  py-3"
              />
            ) : (
              <textarea
                cols={1}
                disabled
                id="messageInput"
                placeholder="Warte auf Jimmy!"
                className="w-full focus:outline-none glass bg-base-100 border-1 focus:shadow-sm pl-5 rounded-3xl  py-3"
              />
            )}
            {value.length > 0 ? (
              <button type="submit" className="btn-circle btn-neutral btn ml-2">
                <Send />
              </button>
            ) : (
              <button
                onClick={reload}
                className="btn btn-circle btn-neutral ml-2"
              >
                <RefreshCcw />
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
