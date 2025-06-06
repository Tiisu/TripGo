import bookingModel from "../models/bookingModel.js";
import tourModel from "../models/tourModel.js";

// Create a new booking
export const createBooking = async (req, res) => {
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

    // Check for missing required fields
    if (!name || !email || !phone || !tourId || !tourTitle || !totalPrice) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    // Validate tour exists and is active
    const tour = await tourModel.findById(tourId);
    if (!tour) {
      return res.json({ success: false, message: "Tour not found" });
    }

    if (tour.status !== "active") {
      return res.json({ success: false, message: "Tour is not available for booking" });
    }

    // Validate number of travelers
    const numTravelers = parseInt(travelers, 10);
    if (numTravelers < 1) {
      return res.json({ success: false, message: "Number of travelers must be at least 1" });
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
        message: `Price mismatch. Expected: ₹${expectedPrice}, Provided: ₹${providedPrice}`
      });
    }

    // Create a new booking with the provided data
    const newBooking = new bookingModel({
      name,
      email,
      phone,
      travelers: numTravelers,
      specialRequests,
      tourId,
      tourTitle,
      totalPrice: providedPrice,
      status: "pending", // Set initial status to 'pending'
    });

    // Save the new booking to the database
    const savedBooking = await newBooking.save();

    // Respond with the saved booking information
    res.json({
      success: true,
      booking: savedBooking,
      message: "Booking created successfully",
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.json({ success: false, message: error.message });
  }
};

// Get bookings by email (for users to see their own bookings)
export const getBookingsByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    console.log("getBookingsByEmail called with email:", email);

    if (!email) {
      return res.json({ success: false, message: "Email is required" });
    }

    // Fetch bookings for the provided email
    const bookings = await bookingModel
      .find({ email })
      .sort({ createdAt: -1 });

    console.log(`Found ${bookings.length} bookings for email: ${email}`);

    res.json({
      success: true,
      bookings,
      message: `Found ${bookings.length} bookings`
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.json({ success: false, message: error.message });
  }
};

// Get all bookings (for admin use - kept for backward compatibility)
export const getBookings = async (req, res) => {
  try {
    const bookings = await bookingModel
      .find()
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.json({ success: false, message: error.message });
  }
};
