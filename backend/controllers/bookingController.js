import bookingModel from "../models/bookingModel.js";

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
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Create a new booking with the provided data
    const newBooking = new bookingModel({
      name,
      email,
      phone,
      travelers: parseInt(travelers, 10), // Ensure travelers is an integer
      specialRequests,
      tourId,
      tourTitle,
      totalPrice: parseFloat(totalPrice), // Ensure totalPrice is a float
      status: "confirmed", // Set the booking status to 'confirmed'
    });

    // Save the new booking to the database
    const savedBooking = await newBooking.save();

    // Respond with the saved booking information
    res.status(201).json({
      success: true,
      booking: savedBooking,
      message: "Booking created successfully",
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all confirmed bookings
// Get all bookings for the logged-in user
export const getBookings = async (req, res) => {
  try {
    const userId = req.userId; // Get user ID from the middleware

    // Fetch only the bookings related to the logged-in user
    const bookings = await bookingModel
      .find({ email: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
