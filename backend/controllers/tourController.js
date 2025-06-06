import tourModel from "../models/tourModel.js";

// Get all tours
export const getAllTours = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const featured = req.query.featured;
    const status = req.query.status || "active";

    let query = { status };
    if (featured !== undefined) {
      query.featured = featured === "true";
    }

    const tours = await tourModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalTours = await tourModel.countDocuments(query);
    const totalPages = Math.ceil(totalTours / limit);

    res.json({
      success: true,
      tours,
      pagination: {
        currentPage: page,
        totalPages,
        totalTours,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get single tour
export const getTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await tourModel.findById(id);

    if (!tour) {
      return res.json({ success: false, message: "Tour not found" });
    }

    res.json({ success: true, tour });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Create new tour (Admin only)
export const createTour = async (req, res) => {
  try {
    const {
      title,
      city,
      distance,
      price,
      maxGroupSize,
      desc,
      availableDates,
      featured
    } = req.body;

    // Validation
    if (!title || !city || !distance || !price || !maxGroupSize || !desc) {
      return res.json({ success: false, message: "All required fields must be provided" });
    }

    // Check if image was uploaded
    if (!req.file) {
      return res.json({ success: false, message: "Tour image is required" });
    }

    // Parse availableDates if it's a string
    let parsedDates = [];
    if (availableDates) {
      try {
        parsedDates = typeof availableDates === 'string' ? JSON.parse(availableDates) : availableDates;
      } catch (e) {
        parsedDates = [];
      }
    }

    const newTour = new tourModel({
      title,
      city,
      distance: parseInt(distance),
      price: parseFloat(price),
      maxGroupSize: parseInt(maxGroupSize),
      desc,
      availableDates: parsedDates,
      photo: `/uploads/tours/${req.file.filename}`, // Store relative path for uploaded files
      featured: featured === 'true' || featured === true,
      reviews: [],
      avgRating: 0
    });

    const savedTour = await newTour.save();
    res.json({ success: true, tour: savedTour });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update tour (Admin only)
export const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Remove fields that shouldn't be updated directly
    delete updateData.reviews;
    delete updateData.avgRating;
    delete updateData._id;

    // Handle availableDates parsing
    if (updateData.availableDates) {
      try {
        updateData.availableDates = typeof updateData.availableDates === 'string'
          ? JSON.parse(updateData.availableDates)
          : updateData.availableDates;
      } catch (e) {
        updateData.availableDates = [];
      }
    }

    // Handle featured boolean conversion
    if (updateData.featured !== undefined) {
      updateData.featured = updateData.featured === 'true' || updateData.featured === true;
    }

    // If new image is uploaded, update photo path
    if (req.file) {
      updateData.photo = `/uploads/tours/${req.file.filename}`;
    }

    const tour = await tourModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!tour) {
      return res.json({ success: false, message: "Tour not found" });
    }

    res.json({ success: true, tour });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Delete tour (Admin only)
export const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    
    const tour = await tourModel.findByIdAndDelete(id);
    
    if (!tour) {
      return res.json({ success: false, message: "Tour not found" });
    }

    res.json({ success: true, message: "Tour deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Add review to tour
export const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rating, comment } = req.body;

    if (!name || !rating) {
      return res.json({ success: false, message: "Name and rating are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.json({ success: false, message: "Rating must be between 1 and 5" });
    }

    const tour = await tourModel.findById(id);
    if (!tour) {
      return res.json({ success: false, message: "Tour not found" });
    }

    tour.reviews.push({
      name,
      rating: parseInt(rating),
      comment: comment || ""
    });

    await tour.save(); // This will trigger the pre-save hook to recalculate avgRating

    res.json({ success: true, tour });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get featured tours
export const getFeaturedTours = async (req, res) => {
  try {
    const tours = await tourModel
      .find({ featured: true, status: "active" })
      .sort({ createdAt: -1 })
      .limit(8);

    res.json({ success: true, tours });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
