import React from "react";
import tourData from "../assets/data/tour.js";
import TourCard from "../components/TourCard.jsx";

const TourList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {tourData.map((tour, index) => (
        <TourCard tour={tour} key={index} />
      ))}
    </div>
  );
};

export default TourList;
