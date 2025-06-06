import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { useTours } from "../context/ToursContext";
import { motion } from "framer-motion";

const Booking = () => {
  const { user, backendUrl } = useContext(AppContext);
  const { backendUrl: toursBackendUrl } = useTours();
  const location = useLocation();
  const navigate = useNavigate();
  const tour = location.state?.tour;

  // Use the backend URL from AppContext or ToursContext
  const apiUrl = backendUrl || toursBackendUrl || "http://localhost:4000";

  if (!tour || !user) {
    navigate("/login");
    return null;
  }

  const { title, price, maxGroupSize, _id } = tour;

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    travelers: 1,
    specialRequests: "",
  });
  const [totalPrice, setTotalPrice] = useState(price);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill out all required fields.");
      return;
    }

    // Validate number of travelers against max group size
    if (parseInt(formData.travelers) > maxGroupSize) {
      toast.error(`Maximum group size for this tour is ${maxGroupSize} people.`);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tourId: _id, // Use _id instead of id for MongoDB tours
          tourTitle: title,
          totalPrice,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to create booking");
      }

      toast.success("Booking successful!");
      navigate("/invoice", { state: { booking: data.booking, tour } });
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Error: " + error.message);
    }
  };

  useEffect(() => {
    setTotalPrice(price * parseInt(formData.travelers, 10));
  }, [formData.travelers, price, tour]);

  // Auto-populate user data when user context is available
  useEffect(() => {
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        name: user.name || prevData.name,
        email: user.email || prevData.email,
      }));
    }
  }, [user]);

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return user ? (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-white/20 rounded-lg  shadow-lg"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-3xl font-bold mb-6">Book Your Tour: {title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-semibold">Name</label>
          <motion.input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-inherit"
            required
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div>
          <label className="block text-lg font-semibold">Email</label>
          <motion.input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-inherit bg-gray-100"
            required
            readOnly
            title="Email is automatically filled from your account"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div>
          <label className="block text-lg font-semibold">Phone Number</label>
          <motion.input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-inherit"
            required
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div>
          <label className="block text-lg font-semibold">
            Number of Travelers (Max: {maxGroupSize})
          </label>
          <motion.input
            type="number"
            name="travelers"
            min="1"
            max={maxGroupSize}
            value={formData.travelers}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-inherit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div>
          <label className="block text-lg font-semibold">
            Special Requests (Optional)
          </label>
          <motion.textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-inherit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Total Price: ₹{totalPrice}</h3>
        </div>
        <motion.button
          type="submit"
          className="w-full bg-gradient-to-b from-sky-500 to-blue-500 text-white hover:from-sky-800 hover:to-blue-700  p-3 rounded-lg bg-inherit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Confirm Booking
        </motion.button>
      </form>
    </motion.div>
  ) : (
    <div className="text-center mt-20">Please log in to make a booking.</div>
  );
};

export default Booking;
