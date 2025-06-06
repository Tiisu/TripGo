import userModel from "../models/userModel.js";
import tourModel from "../models/tourModel.js";
import bookingModel from "../models/bookingModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const admin = await userModel.findOne({ email, role: "admin" });
    if (!admin) {
      return res.json({ success: false, message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (isMatch) {
      const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET);
      return res.json({ 
        success: true, 
        token, 
        admin: { 
          name: admin.name, 
          email: admin.email,
          role: admin.role 
        } 
      });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const totalTours = await tourModel.countDocuments();
    const activeTours = await tourModel.countDocuments({ status: "active" });
    const totalBookings = await bookingModel.countDocuments();
    const confirmedBookings = await bookingModel.countDocuments({ status: "confirmed" });
    const pendingBookings = await bookingModel.countDocuments({ status: "pending" });
    const totalUsers = await userModel.countDocuments({ role: "user" });
    
    // Calculate total revenue
    const revenueResult = await bookingModel.aggregate([
      { $match: { status: "confirmed" } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    // Get recent bookings
    const recentBookings = await bookingModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email tourTitle totalPrice status createdAt');

    res.json({
      success: true,
      stats: {
        totalTours,
        activeTours,
        totalBookings,
        confirmedBookings,
        pendingBookings,
        totalUsers,
        totalRevenue,
        recentBookings
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get all bookings for admin
export const getAllBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const bookings = await bookingModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalBookings = await bookingModel.countDocuments();
    const totalPages = Math.ceil(totalBookings / limit);

    res.json({
      success: true,
      bookings,
      pagination: {
        currentPage: page,
        totalPages,
        totalBookings,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!["pending", "confirmed"].includes(status)) {
      return res.json({ success: false, message: "Invalid status" });
    }

    const booking = await bookingModel.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }

    res.json({ success: true, booking });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find({ role: "user" })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
