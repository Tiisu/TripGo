import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyBookingsSimple = () => {
  const { user, backendUrl } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("MyBookings useEffect triggered");
    console.log("User:", user);
    console.log("User email:", user?.email);
    console.log("Backend URL:", backendUrl);

    if (user && user.email) {
      fetchBookings();
    } else if (user && !user.email) {
      setLoading(false);
      setError("User is logged in but email is missing. Please log out and log in again.");
    } else {
      setLoading(false);
      setError("Please log in to view bookings");
    }
  }, [user, backendUrl]);

  const fetchBookings = async () => {
    try {
      console.log("Starting fetch...");
      setLoading(true);
      setError(null);

      const url = `${backendUrl || "http://localhost:4000"}/api/bookings/user?email=${encodeURIComponent(user.email)}`;
      console.log("Fetching from URL:", url);

      const response = await fetch(url);
      console.log("Response status:", response.status);
      
      const data = await response.json();
      console.log("Response data:", data);

      if (data.success) {
        setBookings(data.bookings || []);
        console.log("Bookings set successfully:", data.bookings);
      } else {
        setError(data.message || "Failed to fetch bookings");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
      console.log("Fetch completed");
    }
  };

  console.log("Render state:", { loading, error, bookingsCount: bookings.length });

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-24">
        <h2 className="text-2xl font-bold mb-4">Please log in to view your bookings</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-24">
        <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
        <div className="text-center py-8">
          <div className="text-lg">Loading your bookings...</div>
          <div className="text-sm text-gray-600 mt-2">
            User: {user.email} | Backend: {backendUrl || "http://localhost:4000"}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-24">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Error</h2>
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={fetchBookings}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-24">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
      
      {bookings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No bookings found</p>
          <p className="text-sm text-gray-500 mt-2">Email: {user.email}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-lg">{booking.tourTitle}</h3>
              <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                <div>
                  <p><strong>Name:</strong> {booking.name}</p>
                  <p><strong>Email:</strong> {booking.email}</p>
                  <p><strong>Phone:</strong> {booking.phone}</p>
                </div>
                <div>
                  <p><strong>Travelers:</strong> {booking.travelers}</p>
                  <p><strong>Total:</strong> ₹{booking.totalPrice}</p>
                  <p><strong>Status:</strong> 
                    <span className={`ml-1 px-2 py-1 rounded text-xs ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </p>
                </div>
              </div>
              {booking.specialRequests && (
                <p className="mt-2 text-sm"><strong>Special Requests:</strong> {booking.specialRequests}</p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Booked on: {new Date(booking.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsSimple;
