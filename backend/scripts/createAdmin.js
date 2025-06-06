import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import "dotenv/config";

const createDefaultAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(`${process.env.MONGODB_URL}/TripGo`);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await userModel.findOne({ email: "admin@tripgo.com" });
    
    if (existingAdmin) {
      console.log("Default admin already exists!");
      console.log("Email: admin@tripgo.com");
      console.log("Password: admin123");
      process.exit(0);
    }

    // Create default admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    const adminUser = new userModel({
      name: "TripGo Admin",
      email: "admin@tripgo.com",
      password: hashedPassword,
      role: "admin"
    });

    await adminUser.save();
    console.log("Default admin created successfully!");
    console.log("Email: admin@tripgo.com");
    console.log("Password: admin123");
    console.log("Please change the password after first login.");

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createDefaultAdmin();
