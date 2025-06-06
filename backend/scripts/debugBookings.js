import mongoose from "mongoose";
import bookingModel from "../models/bookingModel.js";
import userModel from "../models/userModel.js";
import "dotenv/config";

const debugBookings = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(`${process.env.MONGODB_URL}/TripGo`);
    console.log("Connected to MongoDB");

    // Get all bookings
    const allBookings = await bookingModel.find().sort({ createdAt: -1 });
    console.log(`\n📋 Total bookings in database: ${allBookings.length}`);

    if (allBookings.length > 0) {
      console.log("\n🔍 All bookings:");
      allBookings.forEach((booking, index) => {
        console.log(`${index + 1}. Email: ${booking.email} | Tour: ${booking.tourTitle} | Status: ${booking.status} | Created: ${booking.createdAt.toLocaleDateString()}`);
      });

      // Group bookings by email
      const bookingsByEmail = {};
      allBookings.forEach(booking => {
        if (!bookingsByEmail[booking.email]) {
          bookingsByEmail[booking.email] = [];
        }
        bookingsByEmail[booking.email].push(booking);
      });

      console.log("\n📊 Bookings grouped by email:");
      Object.keys(bookingsByEmail).forEach(email => {
        console.log(`${email}: ${bookingsByEmail[email].length} booking(s)`);
      });
    }

    // Get all users
    const allUsers = await userModel.find();
    console.log(`\n👥 Total users in database: ${allUsers.length}`);

    if (allUsers.length > 0) {
      console.log("\n🔍 All users:");
      allUsers.forEach((user, index) => {
        console.log(`${index + 1}. Name: ${user.name} | Email: ${user.email} | Role: ${user.role}`);
      });
    }

    // Check for email mismatches
    console.log("\n🔍 Checking for potential email mismatches...");
    const userEmails = allUsers.map(user => user.email);
    const bookingEmails = [...new Set(allBookings.map(booking => booking.email))];
    
    console.log("User emails:", userEmails);
    console.log("Booking emails:", bookingEmails);

    const orphanedBookings = bookingEmails.filter(email => !userEmails.includes(email));
    if (orphanedBookings.length > 0) {
      console.log("⚠️  Bookings with emails not matching any user:", orphanedBookings);
    } else {
      console.log("✅ All booking emails match registered users");
    }

    // Test a specific email query (like the frontend does)
    if (allUsers.length > 0) {
      const testUser = allUsers[0];
      console.log(`\n🧪 Testing booking retrieval for user: ${testUser.email}`);
      
      const userBookings = await bookingModel
        .find({ email: testUser.email })
        .sort({ createdAt: -1 });
      
      console.log(`Found ${userBookings.length} bookings for ${testUser.email}`);
      userBookings.forEach((booking, index) => {
        console.log(`  ${index + 1}. ${booking.tourTitle} - GH₵${booking.totalPrice} - ${booking.status}`);
      });
    }

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Disconnected from MongoDB");
  }
};

debugBookings();
