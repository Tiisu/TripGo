import React from "react";
import { House, Star } from "lucide-react";
import { Link } from "react-router-dom";

const TourCard = ({ tour }) => {
  const { id, title, photo, desc, price, featured, city, avgRating } = tour;

  return (
    <div className="bg-white/20 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <img src={photo} alt="tourimg" className="w-full h-64 object-cover" />
        {featured && (
          <span className="absolute top-4 left-4 bg-blue-500 text-white py-1 px-3 rounded-md text-sm font-semibold">
            Featured
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center text-gray-600 mb-2">
          <House className="mr-2 text-gray-500" />
          <h3 className="text-lg">{city}</h3>
        </div>
        <div className="flex items-center text-yellow-500 mb-2">
          <Star className="mr-2" />
          <h3 className="text-lg">{avgRating}</h3>
        </div>

        <h3 className="text-xl font-semibold mb-4">
          <Link to={`/tours/${id}`} className="text-blue-600 hover:underline">
            {title}
          </Link>
        </h3>

        <div className="flex justify-between items-center">
          <h5 className="text-xl font-semibold text-gray-800">
            ₹{price} <span className="text-sm text-gray-500">/person</span>
          </h5>
          <button className="bg-gradient-to-b from-sky-500 to-blue-500 text-white hover:from-sky-800 hover:to-blue-700 py-2 px-4 rounded-md transition-colors">
            <Link to={`/tours/${id}`}>Book</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
