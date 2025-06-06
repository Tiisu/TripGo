import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  maxGroupSize: {
    type: Number,
    required: true,
    min: 1,
  },
  desc: {
    type: String,
    required: true,
  },
  availableDates: [{
    type: String,
    required: true,
  }],
  reviews: [reviewSchema],
  avgRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  photo: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
}, {
  timestamps: true,
});

// Calculate average rating before saving
tourSchema.pre('save', function(next) {
  if (this.reviews && this.reviews.length > 0) {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.avgRating = totalRating / this.reviews.length;
  } else {
    this.avgRating = 0;
  }
  next();
});

const tourModel = mongoose.models.tour || mongoose.model("tour", tourSchema);

export default tourModel;
