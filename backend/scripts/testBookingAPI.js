import mongoose from "mongoose";
import tourModel from "../models/tourModel.js";
import bookingModel from "../models/bookingModel.js";
import "dotenv/config";

const testBookingAPI = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(`${process.env.MONGODB_URL}/TripGo`);
    console.log("Connected to MongoDB");

    // Get a sample tour
    const tour = await tourModel.findOne({ status: "active" });
    if (!tour) {
      console.log("No active tours found. Please seed tours first.");
      process.exit(1);
    }

    console.log(`Found tour: ${tour.title} (ID: ${tour._id})`);

    // Create a test booking
    const testBooking = new bookingModel({
      name: "Test User",
      email: "test@example.com",
      phone: "+1234567890",
      travelers: 2,
      specialRequests: "Test booking for API testing",
      tourId: tour._id.toString(),
      tourTitle: tour.title,
      totalPrice: tour.price * 2,
      status: "pending"
    });

    const savedBooking = await testBooking.save();
    console.log("\n✅ Test booking created:");
    console.log("Booking ID:", savedBooking._id);
    console.log("Email:", savedBooking.email);
    console.log("Tour:", savedBooking.tourTitle);

    // Test fetching bookings by email
    console.log("\n🔍 Testing getBookingsByEmail...");
    const bookingsByEmail = await bookingModel
      .find({ email: "test@example.com" })
      .sort({ createdAt: -1 });

    console.log(`Found ${bookingsByEmail.length} bookings for test@example.com:`);
    bookingsByEmail.forEach((booking, index) => {
      console.log(`${index + 1}. ${booking.tourTitle} - GH₵${booking.totalPrice} - ${booking.status}`);
    });

    // Test the API endpoint logic
    console.log("\n🧪 Testing API endpoint logic...");
    const email = "test@example.com";
    const apiResult = await bookingModel
      .find({ email })
      .sort({ createdAt: -1 });

    const apiResponse = {
      success: true,
      bookings: apiResult
    };

    console.log("API Response structure:", {
      success: apiResponse.success,
      bookingsCount: apiResponse.bookings.length,
      firstBooking: apiResponse.bookings[0] ? {
        id: apiResponse.bookings[0]._id,
        tourTitle: apiResponse.bookings[0].tourTitle,
        email: apiResponse.bookings[0].email
      } : null
    });

    // Clean up test booking
    await bookingModel.findByIdAndDelete(savedBooking._id);
    console.log("\n🧹 Test booking cleaned up");

    console.log("\n🎉 Booking API test completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  }
};

testBookingAPI();
