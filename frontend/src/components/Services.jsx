import React from "react";
import ServiceList from "./ServiceList";

const Services = () => {
  return (
    <div className="flex flex-col justify-center items-center my-24 p-6 md:px-28 ">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-4 text-center">
        What we <span className="text-blue-500">Serve</span>
      </h1>
      <p className="text-lg text-gray-600 mb-12 text-center">
        We offer our best services
      </p>
      <ServiceList />
    </div>
  );
};

export default Services;
