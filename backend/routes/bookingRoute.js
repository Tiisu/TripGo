import express from "express";
import {
  createBooking,
  getBookings,
  getBookingsByEmail,
} from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);
bookingRouter.get("/", getBookings);
bookingRouter.get("/user", getBookingsByEmail);

export default bookingRouter;
