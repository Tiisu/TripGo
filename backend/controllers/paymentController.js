import Paystack from "paystack";
import bookingModel from "../models/bookingModel.js";
import tourModel from "../models/tourModel.js";

const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY);

// Initialize payment
export const initializePayment = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      travelers,
      specialRequests,
      tourId,
      tourTitle,
      totalPrice,
    } = req.body;

    console.log("Initializing payment for:", { email, tourTitle, totalPrice });

    // Validate required fields
    if (!name || !email || !phone || !tourId || !tourTitle || !totalPrice) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    // Validate tour exists and get details
    const tour = await tourModel.findById(tourId);
    if (!tour) {
      return res.json({ success: false, message: "Tour not found" });
    }

    // Validate travelers count
    const numTravelers = parseInt(travelers, 10);
    if (isNaN(numTravelers) || numTravelers < 1) {
      return res.json({ success: false, message: "Invalid number of travelers" });
    }

    if (numTravelers > tour.maxGroupSize) {
      return res.json({
        success: false,
        message: `Maximum group size for this tour is ${tour.maxGroupSize} people`
      });
    }

    // Validate total price calculation
    const expectedPrice = tour.price * numTravelers;
    const providedPrice = parseFloat(totalPrice);
    if (Math.abs(expectedPrice - providedPrice) > 0.01) {
      return res.json({
        success: false,
        message: `Price mismatch. Expected: GH₵${expectedPrice}, Provided: GH₵${providedPrice}`
      });
    }

    // Generate unique reference
    const reference = `TG_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create booking with pending payment status
    const newBooking = new bookingModel({
      name,
      email,
      phone,
      travelers: numTravelers,
      specialRequests,
      tourId,
      tourTitle,
      totalPrice: providedPrice,
      status: "pending",
      paymentStatus: "pending",
      paymentReference: reference,
      paymentAmount: providedPrice,
    });

    await newBooking.save();

    // Initialize Paystack payment
    const paymentData = {
      email,
      amount: Math.round(providedPrice * 100), // Paystack expects amount in kobo (pesewas for GHS)
      reference,
      currency: "GHS",
      callback_url: `${process.env.FRONTEND_URL}/payment-success`,
      metadata: {
        bookingId: newBooking._id.toString(),
        tourTitle,
        travelers: numTravelers,
        customerName: name,
        customerPhone: phone,
      },
    };

    const paystackResponse = await paystack.transaction.initialize(paymentData);

    if (paystackResponse.status) {
      // Update booking with Paystack reference
      await bookingModel.findByIdAndUpdate(newBooking._id, {
        paystackReference: paystackResponse.data.reference,
      });

      res.json({
        success: true,
        message: "Payment initialized successfully",
        data: {
          authorization_url: paystackResponse.data.authorization_url,
          access_code: paystackResponse.data.access_code,
          reference: paystackResponse.data.reference,
          bookingId: newBooking._id,
        },
      });
    } else {
      // Delete the booking if payment initialization failed
      await bookingModel.findByIdAndDelete(newBooking._id);
      res.json({
        success: false,
        message: "Failed to initialize payment",
        error: paystackResponse.message,
      });
    }
  } catch (error) {
    console.error("Payment initialization error:", error);
    res.json({
      success: false,
      message: "Error initializing payment",
      error: error.message,
    });
  }
};

// Verify payment
export const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;

    console.log("Verifying payment for reference:", reference);

    // Verify payment with Paystack
    const paystackResponse = await paystack.transaction.verify(reference);

    if (paystackResponse.status && paystackResponse.data.status === "success") {
      // Find booking by reference
      const booking = await bookingModel.findOne({
        $or: [
          { paymentReference: reference },
          { paystackReference: reference }
        ]
      });

      if (!booking) {
        return res.json({
          success: false,
          message: "Booking not found for this payment reference",
        });
      }

      // Update booking status
      booking.paymentStatus = "paid";
      booking.status = "confirmed";
      booking.paymentDate = new Date();
      booking.paystackReference = paystackResponse.data.reference;
      
      await booking.save();

      res.json({
        success: true,
        message: "Payment verified successfully",
        booking,
        paymentData: paystackResponse.data,
      });
    } else {
      // Find booking and update payment status to failed
      const booking = await bookingModel.findOne({
        $or: [
          { paymentReference: reference },
          { paystackReference: reference }
        ]
      });

      if (booking) {
        booking.paymentStatus = "failed";
        await booking.save();
      }

      res.json({
        success: false,
        message: "Payment verification failed",
        error: paystackResponse.message || "Payment was not successful",
      });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.json({
      success: false,
      message: "Error verifying payment",
      error: error.message,
    });
  }
};

// Get payment status
export const getPaymentStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await bookingModel.findById(bookingId);
    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }

    res.json({
      success: true,
      paymentStatus: booking.paymentStatus,
      status: booking.status,
      paymentReference: booking.paymentReference,
      paystackReference: booking.paystackReference,
      paymentDate: booking.paymentDate,
    });
  } catch (error) {
    console.error("Get payment status error:", error);
    res.json({
      success: false,
      message: "Error getting payment status",
      error: error.message,
    });
  }
};
