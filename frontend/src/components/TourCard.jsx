import React from "react";
import { House, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const hoverEffect = {
  scale: 1.05,
  transition: { duration: 0.3 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const TourCard = ({ tour }) => {
  const { _id, title, photo, desc, price, featured, city, avgRating } = tour;
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  return (
    <motion.div
      className="bg-white/20 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
      whileHover={hoverEffect}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="relative">
        <img
          src={photo ? (photo.startsWith('http') ? photo : `${backendUrl}${photo}`) : "/api/placeholder/400/300"}
          alt="tourimg"
          className="w-full h-64 object-cover"
          onError={(e) => {
            e.target.src = "/api/placeholder/400/300";
          }}
        />
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
          <Link
            to={`/tours/${_id}`}
            onClick={() => scrollTo(0, 0)}
            className="text-blue-600 hover:underline"
          >
            {title}
          </Link>
        </h3>

        <div className="flex justify-between items-center">
          <h5 className="text-xl font-semibold text-gray-800">
            GH₵{price} <span className="text-sm text-gray-500">/person</span>
          </h5>
          <motion.button
            className="bg-gradient-to-b from-sky-500 to-blue-500 text-white hover:from-sky-800 hover:to-blue-700 py-2 px-4 rounded-md transition-colors"
            onClick={() => scrollTo(0, 0)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to={`/tours/${_id}`}>Book</Link>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TourCard;
