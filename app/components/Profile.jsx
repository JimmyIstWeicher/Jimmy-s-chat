import React from "react";

const Profile = () => {
  return (
    <div className="flex sm:items-center justify-between py-3 border-b-2 border-neutral">
      <div className="relative flex items-center space-x-4">
        <div className="relative">
          <img
            src="image.png"
            alt=""
            className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
          />
        </div>
        <div className="flex flex-col leading-tight">
          <div className="text-2xl mt-1 flex items-center">
            <span className="mr-3">Jimmy Bär</span>
          </div>
          <span className="text-lg">Bester Teddy der Welt</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
