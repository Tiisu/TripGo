import express from "express";
import {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  addReview,
  getFeaturedTours
} from "../controllers/tourController.js";
import { adminAuth, userAuth } from "../middleware/adminAuth.js";
import upload from "../middleware/upload.js";

const tourRouter = express.Router();

// Public routes
tourRouter.get("/", getAllTours);
tourRouter.get("/featured", getFeaturedTours);
tourRouter.get("/:id", getTour);

// User routes (require authentication)
tourRouter.post("/:id/review", userAuth, addReview);

// Admin routes (require admin authentication)
tourRouter.post("/", adminAuth, upload.single('photo'), createTour);
tourRouter.put("/:id", adminAuth, upload.single('photo'), updateTour);
tourRouter.delete("/:id", adminAuth, deleteTour);

export default tourRouter;
