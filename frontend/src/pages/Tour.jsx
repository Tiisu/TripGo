import React from "react";
import TourCard from "../components/TourCard";
import tourData from "../assets/data/tour.js";

const Tour = () => {
  return (
    <div>
      <div
        className="relative bg-cover bg-center bg-no-repeat h-64 sm:h-80 lg:h-96 mb-20"
        style={{ backgroundImage: "url('/tour.jpg')" }}
      >
        {/* Dimmer Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>{" "}
        {/* This dims the background */}
        <h1 className="text-3xl sm:text-4xl font-semibold mb-4 text-center text-gray-100 absolute inset-0 flex items-center justify-center">
          All Tours
        </h1>
      </div>

      {/* Tours grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {tourData.map((tour, index) => (
          <TourCard tour={tour} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Tour;
