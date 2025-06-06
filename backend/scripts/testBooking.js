import mongoose from "mongoose";
import tourModel from "../models/tourModel.js";
import bookingModel from "../models/bookingModel.js";
import "dotenv/config";

const testBookingFlow = async () => {
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
    console.log(`Price: ₹${tour.price}, Max Group Size: ${tour.maxGroupSize}`);

    // Test booking data
    const testBooking = {
      name: "Test User",
      email: "test@example.com",
      phone: "+1234567890",
      travelers: 2,
      specialRequests: "Test booking from script",
      tourId: tour._id.toString(),
      tourTitle: tour.title,
      totalPrice: tour.price * 2,
    };

    console.log("\nTesting booking creation...");
    console.log("Booking data:", testBooking);

    // Create booking
    const newBooking = new bookingModel(testBooking);
    const savedBooking = await newBooking.save();

    console.log("\n✅ Booking created successfully!");
    console.log("Booking ID:", savedBooking._id);
    console.log("Status:", savedBooking.status);
    console.log("Created at:", savedBooking.createdAt);

    // Test fetching bookings
    const allBookings = await bookingModel.find().sort({ createdAt: -1 }).limit(5);
    console.log(`\n📋 Recent bookings (${allBookings.length}):`);
    allBookings.forEach((booking, index) => {
      console.log(`${index + 1}. ${booking.name} - ${booking.tourTitle} - ₹${booking.totalPrice}`);
    });

    // Clean up test booking
    await bookingModel.findByIdAndDelete(savedBooking._id);
    console.log("\n🧹 Test booking cleaned up");

    console.log("\n🎉 Booking system test completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  }
};

testBookingFlow();
