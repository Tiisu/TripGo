import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Middleware to verify admin authentication
export const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token

    if (!token) {
      return res.json({ success: false, message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user exists and is admin
    const user = await userModel.findById(decoded.id);
    if (!user || user.role !== "admin") {
      return res.json({ success: false, message: "Access denied. Admin privileges required." });
    }

    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Invalid token." });
  }
};

// Middleware to verify user authentication (for regular users)
export const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token

    if (!token) {
      return res.json({ success: false, message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user exists
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }

    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Invalid token." });
  }
};
