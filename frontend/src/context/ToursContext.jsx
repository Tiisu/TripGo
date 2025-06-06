import React, { createContext, useContext, useState, useEffect } from "react";

const ToursContext = createContext();

export const useTours = () => {
  const context = useContext(ToursContext);
  if (!context) {
    throw new Error("useTours must be used within a ToursProvider");
  }
  return context;
};

const ToursContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const [tours, setTours] = useState([]);
  const [featuredTours, setFeaturedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTours();
    fetchFeaturedTours();
  }, []);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/tours`);
      const data = await response.json();
      
      if (data.success) {
        setTours(data.tours);
        setError(null);
      } else {
        setError(data.message || "Failed to fetch tours");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching tours:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedTours = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/tours/featured`);
      const data = await response.json();
      
      if (data.success) {
        setFeaturedTours(data.tours);
      }
    } catch (error) {
      console.error("Error fetching featured tours:", error);
    }
  };

  const getTourById = (id) => {
    return tours.find(tour => tour._id === id);
  };

  const refreshTours = () => {
    fetchTours();
    fetchFeaturedTours();
  };

  const value = {
    tours,
    featuredTours,
    loading,
    error,
    backendUrl,
    getTourById,
    refreshTours,
  };

  return (
    <ToursContext.Provider value={value}>
      {children}
    </ToursContext.Provider>
  );
};

export default ToursContextProvider;
