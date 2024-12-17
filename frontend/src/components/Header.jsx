import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col items-center text-center my-20">
      <h1 className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center">
        Welcome to <span className="text-blue-500">TripGo</span>
      </h1>
      <p className="text-center text-md  sm:text-xl mx-auto mt-5">
        Your ultimate travel companion!
      </p>
      <p className="text-center text-md sm:text-xl mx-auto">
        Discover exciting destinations, exclusive deals, and seamless booking
        experience.
      </p>

      <img
        src={assets.headerimg}
        alt="earth"
        className="w-[200px] sm:w-[300px] lg:w-[450px]"
      />
    </div>
  );
};

export default Header;
