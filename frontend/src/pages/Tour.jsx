import React from "react";
import { motion } from "framer-motion";
import TourCard from "../components/TourCard";
import { useTours } from "../context/ToursContext";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Tour = () => {
  const { tours, loading, error } = useTours();

  if (loading) {
    return (
      <div>
        <motion.div
          className="relative bg-cover bg-center bg-no-repeat h-64 sm:h-80 lg:h-96 mb-20"
          style={{ backgroundImage: "url('/tour.jpg')" }}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <motion.h1
            className="text-3xl sm:text-4xl font-semibold mb-4 text-center text-gray-100 absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            All Tours
          </motion.h1>
        </motion.div>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading tours...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <motion.div
          className="relative bg-cover bg-center bg-no-repeat h-64 sm:h-80 lg:h-96 mb-20"
          style={{ backgroundImage: "url('/tour.jpg')" }}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <motion.h1
            className="text-3xl sm:text-4xl font-semibold mb-4 text-center text-gray-100 absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            All Tours
          </motion.h1>
        </motion.div>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        className="relative bg-cover bg-center bg-no-repeat h-64 sm:h-80 lg:h-96 mb-20"
        style={{ backgroundImage: "url('/tour.jpg')" }}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Dimmer Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>{" "}
        <motion.h1
          className="text-3xl sm:text-4xl font-semibold mb-4 text-center text-gray-100 absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          All Tours
        </motion.h1>
      </motion.div>

      {tours.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">No tours available</div>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {tours.map((tour, index) => (
            <motion.div
              key={tour._id}
              initial="hidden"
              animate="visible"
              variants={slideUp}
              transition={{ delay: 0.2 * index, duration: 0.6 }}
            >
              <TourCard tour={tour} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Tour;
