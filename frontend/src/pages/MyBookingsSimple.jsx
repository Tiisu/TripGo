import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  FileText,
  Plane,
  CreditCard
} from "lucide-react";

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

  // Enhanced status badge component
  const getStatusBadge = (status, paymentStatus) => {
    const statusConfig = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        icon: AlertCircle,
        label: "Pending"
      },
      confirmed: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: CheckCircle,
        label: "Confirmed"
      }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <div className="flex flex-col gap-1">
        <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
          <Icon className="w-3 h-3 mr-1" />
          {config.label}
        </span>
        {paymentStatus && (
          <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
            paymentStatus === 'paid'
              ? 'bg-blue-100 text-blue-800'
              : paymentStatus === 'pending'
              ? 'bg-orange-100 text-orange-800'
              : 'bg-red-100 text-red-800'
          }`}>
            <CreditCard className="w-3 h-3 mr-1" />
            {paymentStatus}
          </span>
        )}
      </div>
    );
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center">
      <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
    </div>
  );

  console.log("Render state:", { loading, error, bookingsCount: bookings.length });

  if (!user) {
    return (
      <motion.div
        className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-white/20 backdrop-blur-sm rounded-xl shadow-xl mt-20 sm:mt-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center py-12">
          <Plane className="w-16 h-16 mx-auto text-blue-500 mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Please log in to view your bookings</h2>
          <p className="text-gray-600">Access your travel history and manage your bookings</p>
        </div>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <motion.div
        className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-white/20 backdrop-blur-sm rounded-xl shadow-xl mt-20 sm:mt-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
            My <span className="text-blue-500">Bookings</span>
          </h2>
        </div>
        <div className="text-center py-12">
          <LoadingSpinner />
          <div className="text-lg text-gray-700 mt-4">Loading your bookings...</div>
          <div className="text-sm text-gray-500 mt-2">
            Please wait while we fetch your travel history
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-white/20 backdrop-blur-sm rounded-xl shadow-xl mt-20 sm:mt-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-red-600">Error Loading Bookings</h2>
          <p className="text-red-600 mb-6 max-w-md mx-auto">{error}</p>
          <motion.button
            onClick={fetchBookings}
            className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-white/20 backdrop-blur-sm rounded-xl shadow-xl mt-20 sm:mt-24 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            My <span className="text-blue-500">Bookings</span>
          </h2>
          <p className="text-gray-600">Manage and track your travel bookings</p>
        </div>
        <motion.button
          onClick={fetchBookings}
          disabled={loading}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
          whileHover={{ scale: loading ? 1 : 1.05 }}
          whileTap={{ scale: loading ? 1 : 0.95 }}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          {loading ? "Refreshing..." : "Refresh"}
        </motion.button>
      </div>

      {bookings.length === 0 ? (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Plane className="w-20 h-20 mx-auto text-gray-400 mb-6" />
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">No bookings found</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            You haven't made any bookings yet. Start exploring our amazing tours and destinations!
          </p>
          <motion.button
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/tours'}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Explore Tours
          </motion.button>
        </motion.div>
      ) : (
        <div className="grid gap-6 md:gap-8">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking._id}
              className="bg-white/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              {/* Booking Header */}
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                    {booking.tourTitle}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    Booked on {new Date(booking.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <div className="lg:ml-6 mt-4 lg:mt-0">
                  {getStatusBadge(booking.status, booking.paymentStatus)}
                </div>
              </div>

              {/* Booking Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {/* Personal Information */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Contact Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      {booking.name}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      {booking.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      {booking.phone}
                    </div>
                  </div>
                </div>

                {/* Trip Information */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Trip Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-gray-400" />
                      {booking.travelers} {booking.travelers === 1 ? 'Traveler' : 'Travelers'}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="font-semibold text-lg text-gray-800">GH₵{booking.totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Actions</h4>
                  <div className="flex flex-col gap-2">
                    <motion.button
                      className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View Details
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {booking.specialRequests && (
                <div className="border-t border-white/20 pt-4">
                  <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide mb-2">Special Requests</h4>
                  <p className="text-sm text-gray-600 bg-white/20 rounded-lg p-3">
                    {booking.specialRequests}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyBookingsSimple;
