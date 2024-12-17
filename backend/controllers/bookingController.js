import bookingModel from "../models/bookingModel.js";

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

    if (!name || !email || !phone || !tourId || !tourTitle || !totalPrice) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const newBooking = new bookingModel({
      name,
      email,
      phone,
      travelers: parseInt(travelers, 10),
      specialRequests,
      tourId,
      tourTitle,
      totalPrice: parseFloat(totalPrice),
    });

    const savedBooking = await newBooking.save();
    res.status(201).json({ success: true, booking: savedBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
