import mongoose from "mongoose";
import bookingModel from "../models/bookingModel.js";
import userModel from "../models/userModel.js";
import "dotenv/config";

const fixOrphanedBookings = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(`${process.env.MONGODB_URL}/TripGo`);
    console.log("Connected to MongoDB");

    // Get all bookings and users
    const allBookings = await bookingModel.find();
    const allUsers = await userModel.find();

    console.log(`Found ${allBookings.length} bookings and ${allUsers.length} users`);

    // Create a map of user emails
    const userEmails = allUsers.map(user => user.email);
    console.log("Registered user emails:", userEmails);

    // Find orphaned bookings
    const orphanedBookings = allBookings.filter(booking => 
      !userEmails.includes(booking.email)
    );

    console.log(`\nFound ${orphanedBookings.length} orphaned bookings:`);
    orphanedBookings.forEach((booking, index) => {
      console.log(`${index + 1}. ${booking.email} - ${booking.tourTitle}`);
    });

    if (orphanedBookings.length === 0) {
      console.log("✅ No orphaned bookings found!");
      return;
    }

    // Interactive fix - for now, let's create a mapping strategy
    const emailMappings = {
      'tiisusharif@gmail.com': 'admin@tripgo.com', // Map to admin
      'tisssi@gmail.com': 'tii@gmail.com', // Similar email
      'ghana123@gmail.com': 'ghana@gmail.com', // Similar email
      'ghana123@gmail.comm': 'ghana@gmail.com', // Typo fix
      'tiisu@gmail.com': 'tii@gmail.com', // Similar email
    };

    console.log("\n🔧 Applying email mappings:");
    console.log(emailMappings);

    let fixedCount = 0;
    for (const booking of orphanedBookings) {
      const newEmail = emailMappings[booking.email];
      if (newEmail && userEmails.includes(newEmail)) {
        console.log(`Updating ${booking.email} -> ${newEmail} for booking ${booking._id}`);
        
        await bookingModel.findByIdAndUpdate(booking._id, { email: newEmail });
        fixedCount++;
      } else {
        console.log(`⚠️  No mapping found for ${booking.email}`);
      }
    }

    console.log(`\n✅ Fixed ${fixedCount} orphaned bookings`);

    // Verify the fix
    console.log("\n🔍 Verification - checking for remaining orphaned bookings:");
    const remainingOrphaned = await bookingModel.find({
      email: { $nin: userEmails }
    });

    console.log(`Remaining orphaned bookings: ${remainingOrphaned.length}`);
    if (remainingOrphaned.length > 0) {
      remainingOrphaned.forEach((booking, index) => {
        console.log(`${index + 1}. ${booking.email} - ${booking.tourTitle}`);
      });
    }

    // Show updated booking counts per user
    console.log("\n📊 Updated booking counts per user:");
    for (const user of allUsers) {
      const userBookings = await bookingModel.find({ email: user.email });
      console.log(`${user.email}: ${userBookings.length} booking(s)`);
    }

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Disconnected from MongoDB");
  }
};

fixOrphanedBookings();
