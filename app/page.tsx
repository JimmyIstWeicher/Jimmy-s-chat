"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronRight, Mic } from "react-feather";
import Profile from "./components/Profile";
import MessageJimmy from "./components/MessageJimmy";
import MessageUser from "./components/MessageUser";

export default function Home() {
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

  const handleSendMessage = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const inputElement = document.getElementById(
      "messageInput"
    ) as HTMLInputElement;

    if (inputElement && inputElement.value.trim() !== "") {
      const message = inputElement.value.trim();
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", message: message },
      ]);
      if (connection.current) {
        connection.current.send(message);
      }
      inputElement.value = "";
    }
  };

  return (
    <div  className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-screen bg-base-100">
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
      <div className="border-t-2 border-neutral px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center justify-center w-screen"
          >
            <input
              id="messageInput"
              type="text"
              placeholder="Schreibe deine Nachricht!"
              className="w-full focus:outline-none bg-amber-50	 pl-5 rounded-tl-full rounded-bl-full py-3"
              />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-tr-full rounded-br-full px-4 py-3 btn-neutral btn "
            >
              <span className="font-bold pr-2">Send</span>
              <ChevronRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
