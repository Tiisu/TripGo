import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const MyBookings = () => {
  const { user, backendUrl } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.email && backendUrl) {
      fetchUserBookings();
    } else if (user && !user.email) {
      setError("User email not found");
      setLoading(false);
    } else if (!backendUrl) {
      setError("Backend URL not configured");
      setLoading(false);
    }
  }, [user, backendUrl]);

  const fetchUserBookings = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user || !user.email) {
        setError("User email not found");
        return;
      }

      const url = `${backendUrl}/api/bookings/user?email=${encodeURIComponent(user.email)}`;
      console.log("Fetching bookings from:", url);
      console.log("User email being used:", user.email);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Bookings response:", data);
      console.log("Number of bookings found:", data.bookings?.length || 0);

      if (data.success) {
        setBookings(data.bookings || []);
      } else {
        setError(data.message || "Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to fetch bookings: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
    };

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white/20 rounded-lg shadow-lg mt-24">
        <h2 className="text-3xl font-bold mb-6">Please log in to view your bookings</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white/20 rounded-lg shadow-lg mt-24">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading your bookings...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white/20 rounded-lg shadow-lg mt-24">
        <h2 className="text-3xl font-bold mb-6 text-red-600">Error Loading Bookings</h2>
        <p className="text-red-600 mb-4">{error}</p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Debug Information:</h4>
          <p><strong>Backend URL:</strong> {backendUrl}</p>
          <p><strong>User Email:</strong> {user?.email}</p>
          <p><strong>API Endpoint:</strong> {backendUrl}/api/bookings/user?email={user?.email}</p>
        </div>
        <button
          onClick={fetchUserBookings}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto p-6 bg-white/20 rounded-lg shadow-lg mt-24 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">
          My <span className="text-blue-500">Bookings</span>
        </h2>
        <button
          onClick={fetchUserBookings}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl text-gray-600 mb-4">No bookings found</h3>
          <p className="text-gray-500">You haven't made any bookings yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <motion.div
              key={booking._id}
              className="bg-white/30 rounded-lg p-6 shadow-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {booking.tourTitle}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p><strong>Booking Date:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
                      <p><strong>Travelers:</strong> {booking.travelers} people</p>
                      <p><strong>Total Price:</strong> ₹{booking.totalPrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <p><strong>Name:</strong> {booking.name}</p>
                      <p><strong>Phone:</strong> {booking.phone}</p>
                      {booking.specialRequests && (
                        <p><strong>Special Requests:</strong> {booking.specialRequests}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  {getStatusBadge(booking.status)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyBookings;
