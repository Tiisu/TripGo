import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";

const PaymentFailure = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const reference = searchParams.get("reference");
  const message = searchParams.get("message") || "Payment was not completed successfully";

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleTryAgain = () => {
    navigate("/tours");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 py-12">
      <motion.div
        className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Failure Icon */}
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Failed</h1>
          <p className="text-gray-600">Your payment could not be processed</p>
        </motion.div>

        {/* Error Details */}
        <motion.div
          className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-2 text-red-800">What happened?</h3>
          <p className="text-red-700 mb-4">{message}</p>
          
          {reference && (
            <div>
              <p className="text-sm text-red-600">Reference: {reference}</p>
            </div>
          )}
        </motion.div>

        {/* Possible Reasons */}
        <motion.div
          className="bg-gray-50 rounded-lg p-6 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Possible Reasons</h3>
          <ul className="text-gray-700 space-y-2">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Insufficient funds in your account
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Card details were entered incorrectly
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Your bank declined the transaction
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Network connection issues
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Payment session expired
            </li>
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={handleTryAgain}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </button>
          <button
            onClick={handleBackToHome}
            className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </motion.div>

        {/* Help Section */}
        <motion.div
          className="mt-8 p-4 bg-blue-50 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <h4 className="font-semibold text-blue-800 mb-2">Need Help?</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• Contact your bank to ensure your card is enabled for online transactions</p>
            <p>• Check your internet connection and try again</p>
            <p>• Make sure you have sufficient funds in your account</p>
            <p>• If the problem persists, contact our support team</p>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="text-sm text-blue-700">
              <strong>Support:</strong> support@tripgo.com | +233 123 456 789
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentFailure;
