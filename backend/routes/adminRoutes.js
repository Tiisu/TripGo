import express from "express";
import {
  adminLogin,
  getDashboardStats,
  getAllBookings,
  updateBookingStatus,
  getAllUsers
} from "../controllers/adminController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const adminRouter = express.Router();

// Admin authentication
adminRouter.post("/login", adminLogin);

// Protected admin routes
adminRouter.get("/dashboard", adminAuth, getDashboardStats);
adminRouter.get("/bookings", adminAuth, getAllBookings);
adminRouter.put("/bookings/:bookingId/status", adminAuth, updateBookingStatus);
adminRouter.get("/users", adminAuth, getAllUsers);

export default adminRouter;
