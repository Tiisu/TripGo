import React from "react";
import { TrendingUp, UserCheck, Award } from "lucide-react";

const Experience = () => {
  return (
    <div className="py-16 ">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-6 text-center text-gray-800">
        Experience our <span className="text-blue-500">TripGo</span>
      </h1>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
        With our all experience, <br />
        we will provide you the best services.
      </p>

      {/* Stats Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {/* Successful Trips */}
        <div className="flex flex-col items-center bg-white/20 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <TrendingUp className="text-blue-500 mb-4 text-4xl" />
          <span className="text-2xl font-semibold text-gray-800">12k+</span>
          <h6 className="text-lg text-gray-600">Successful Trips</h6>
        </div>

        {/* Regular Clients */}
        <div className="flex flex-col items-center bg-white/20 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <UserCheck className="text-green-500 mb-4 text-4xl" />
          <span className="text-2xl font-semibold text-gray-800">2k+</span>
          <h6 className="text-lg text-gray-600">Regular Clients</h6>
        </div>

        {/* Experience */}
        <div className="flex flex-col items-center bg-white/20 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <Award className="text-yellow-500 mb-4 text-4xl" />
          <span className="text-2xl font-semibold text-gray-800">10k+</span>
          <h6 className="text-lg text-gray-600">Experience</h6>
        </div>
      </div>
    </div>
  );
};

export default Experience;
