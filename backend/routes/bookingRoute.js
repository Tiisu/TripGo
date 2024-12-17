import express from "express";
import {
  createBooking,
  getBookings,
} from "../controllers/bookingController.js";

const bookingRouter = express.Router();

// Use bookingRouter instead of router
bookingRouter.post("/", createBooking);
bookingRouter.get("/", getBookings);

export default bookingRouter;
