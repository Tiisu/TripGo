import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const UserBooking = () => {
  const { user } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/bookings`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading your bookings...</div>;
  }

  return (
    user && (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Your <span className="text-blue-500"> Bookings</span>
        </h1>
        {bookings.length === 0 ? (
          <p>You haven't made any bookings yet.</p>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white/20 rounded-lg shadow-md p-6"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {booking.tourTitle}
                </h2>
                <p>
                  <strong>Booking Date:</strong>{" "}
                  {new Date(booking.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Name:</strong> {booking.name}
                </p>
                <p>
                  <strong>Email:</strong> {booking.email}
                </p>
                <p>
                  <strong>Phone:</strong> {booking.phone}
                </p>
                <p>
                  <strong>Travelers:</strong> {booking.travelers}
                </p>
                <p>
                  <strong>Total Price:</strong> ₹{booking.totalPrice}
                </p>
                {booking.specialRequests && (
                  <p>
                    <strong>Special Requests:</strong> {booking.specialRequests}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  );
};

export default UserBooking;
