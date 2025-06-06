import React, { useState, useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Download, ArrowLeft } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reference = searchParams.get("reference");

  useEffect(() => {
    if (reference) {
      verifyPayment();
    } else {
      setError("No payment reference found");
      setLoading(false);
    }
  }, [reference]);

  const verifyPayment = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/payments/verify/${reference}`);
      const data = await response.json();

      if (data.success) {
        setBooking(data.booking);
        toast.success("Payment verified successfully!");
      } else {
        setError(data.message || "Payment verification failed");
        toast.error(data.message || "Payment verification failed");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      setError("Error verifying payment");
      toast.error("Error verifying payment");
    } finally {
      setLoading(false);
    }
  };

  const handleViewInvoice = () => {
    if (booking) {
      navigate("/invoice", { state: { booking } });
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Verifying your payment...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <motion.div
          className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Verification Failed</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleBackToHome}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
      <motion.div
        className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Success Icon */}
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">Your booking has been confirmed</p>
        </motion.div>

        {/* Booking Details */}
        {booking && (
          <motion.div
            className="bg-gray-50 rounded-lg p-6 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Booking Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Tour</p>
                <p className="font-semibold">{booking.tourTitle}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Travelers</p>
                <p className="font-semibold">{booking.travelers} people</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="font-semibold text-green-600">GH₵{booking.totalPrice}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Status</p>
                <p className="font-semibold text-green-600 capitalize">{booking.paymentStatus}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Booking Reference</p>
                <p className="font-semibold">{booking.paymentReference}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Date</p>
                <p className="font-semibold">
                  {booking.paymentDate ? new Date(booking.paymentDate).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={handleViewInvoice}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            <Download className="w-5 h-5 mr-2" />
            View Invoice
          </button>
          <button
            onClick={handleBackToHome}
            className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          className="mt-8 p-4 bg-blue-50 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h4 className="font-semibold text-blue-800 mb-2">What's Next?</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• You will receive a confirmation email shortly</li>
            <li>• Our team will contact you 24-48 hours before your tour</li>
            <li>• You can view your booking details in "My Bookings"</li>
            <li>• For any questions, contact our support team</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
