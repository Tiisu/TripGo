import express from "express";
import {
  initializePayment,
  verifyPayment,
  getPaymentStatus,
} from "../controllers/paymentController.js";

const paymentRouter = express.Router();

// Initialize payment
paymentRouter.post("/initialize", initializePayment);

// Verify payment
paymentRouter.get("/verify/:reference", verifyPayment);

// Get payment status
paymentRouter.get("/status/:bookingId", getPaymentStatus);

export default paymentRouter;
