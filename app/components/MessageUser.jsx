import React from "react";

const MessageUser = ({ children }) => {
  return (
    <div className="chat-message">
      <div className="flex items-end justify-end">
        <div className="flex flex-col space-y-2 text-md max-w-xs mx-2 order-1 items-end">
          <div>
            <span className="px-4 py-2 rounded-3xl inline-block rounded-br-none chat-bubble-accent  ">
              {children}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageUser;
