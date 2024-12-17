import React from "react";
import TourList from "./TourList";

const AllTours = () => {
  return (
    <div className="flex flex-col justify-center items-center my-24 p-6 md:px-28">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-4 text-center text-gray-800">
        Our Featured <span className="text-blue-500">Tours</span>
      </h1>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl">
        Unforgettable Journeys Tailored to Your Interests. Explore the world in
        the most beautiful and luxurious ways possible.
      </p>
      <TourList />
    </div>
  );
};

export default AllTours;
