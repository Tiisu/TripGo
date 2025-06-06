import mongoose from "mongoose";
import tourModel from "../models/tourModel.js";
import bookingModel from "../models/bookingModel.js";
import "dotenv/config";

const createTestBooking = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(`${process.env.MONGODB_URL}/TripGo`);
    console.log("Connected to MongoDB");

    // Get a sample tour
    const tour = await tourModel.findOne({ status: "active" });
    if (!tour) {
      console.log("No active tours found. Please seed tours first with: npm run seed-tours");
      process.exit(1);
    }

    console.log(`Using tour: ${tour.title} (ID: ${tour._id})`);

    // Create a test booking with a common email
    const testEmail = "user@example.com";
    
    // Check if booking already exists
    const existingBooking = await bookingModel.findOne({ 
      email: testEmail,
      tourId: tour._id 
    });

    if (existingBooking) {
      console.log("Test booking already exists for this email and tour");
      console.log("Existing booking:", {
        id: existingBooking._id,
        tourTitle: existingBooking.tourTitle,
        email: existingBooking.email,
        status: existingBooking.status
      });
      process.exit(0);
    }

    const testBooking = new bookingModel({
      name: "Test User",
      email: testEmail,
      phone: "+1234567890",
      travelers: 2,
      specialRequests: "This is a test booking for development",
      tourId: tour._id.toString(),
      tourTitle: tour.title,
      totalPrice: tour.price * 2,
      status: "confirmed"
    });

    const savedBooking = await testBooking.save();
    
    console.log("\n✅ Test booking created successfully!");
    console.log("Booking details:");
    console.log("- ID:", savedBooking._id);
    console.log("- Email:", savedBooking.email);
    console.log("- Tour:", savedBooking.tourTitle);
    console.log("- Travelers:", savedBooking.travelers);
    console.log("- Total Price: ₹" + savedBooking.totalPrice);
    console.log("- Status:", savedBooking.status);
    console.log("- Created:", savedBooking.createdAt);

    console.log("\n📝 To test the My Bookings page:");
    console.log("1. Register/login with email: user@example.com");
    console.log("2. Go to 'My Bookings' page");
    console.log("3. You should see this test booking");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating test booking:", error);
    process.exit(1);
  }
};

createTestBooking();
