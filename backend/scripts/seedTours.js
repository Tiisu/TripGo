import mongoose from "mongoose";
import tourModel from "../models/tourModel.js";
import "dotenv/config";

const sampleTours = [
  {
    title: "Westminster Bridge",
    city: "London",
    distance: 300,
    price: 10000,
    maxGroupSize: 10,
    desc: "Experience the iconic Westminster Bridge, offering stunning views of the Houses of Parliament and Big Ben in the heart of London.",
    availableDates: ["5-1-2025", "2-1-2025", "7-2-2025"],
    photo: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500",
    featured: true,
    reviews: [
      {
        name: "John Doe",
        rating: 4.6,
        comment: "Amazing experience with great views!"
      }
    ]
  },
  {
    title: "Bali, Indonesia",
    city: "Indonesia",
    distance: 400,
    price: 15000,
    maxGroupSize: 8,
    desc: "Relax in the tropical paradise of Bali, Indonesia, known for its beaches, jungles, and vibrant culture.",
    availableDates: ["5-1-2025", "2-1-2025", "7-2-2025"],
    photo: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=500",
    featured: true,
    reviews: [
      {
        name: "Jane Smith",
        rating: 4.8,
        comment: "Perfect tropical getaway!"
      }
    ]
  },
  {
    title: "Snowy Mountains, Thailand",
    city: "Thailand",
    distance: 500,
    price: 12000,
    maxGroupSize: 8,
    desc: "Discover the serene beauty of the Snowy Mountains in Thailand, perfect for adventurers and nature lovers.",
    availableDates: ["5-1-2025", "2-1-2025", "7-2-2025"],
    photo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
    featured: true,
    reviews: [
      {
        name: "Mike Johnson",
        rating: 4.5,
        comment: "Breathtaking mountain views!"
      }
    ]
  },
  {
    title: "Beautiful Sunrise, Thailand",
    city: "Phuket",
    distance: 500,
    price: 11000,
    maxGroupSize: 8,
    desc: "Witness the most beautiful sunrise in Thailand with this amazing tour package.",
    availableDates: ["5-1-2025", "2-1-2025", "7-2-2025"],
    photo: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=500",
    featured: true,
    reviews: []
  },
  {
    title: "Nusa Penida Bali, Indonesia",
    city: "Bali",
    distance: 500,
    price: 13000,
    maxGroupSize: 8,
    desc: "Explore the hidden gem of Nusa Penida with its crystal clear waters and stunning cliffs.",
    availableDates: ["5-1-2025", "2-1-2025", "7-2-2025"],
    photo: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500",
    featured: true,
    reviews: []
  },
  {
    title: "Cherry Blossoms Spring",
    city: "Tokyo",
    distance: 500,
    price: 18000,
    maxGroupSize: 8,
    desc: "Experience the magical cherry blossom season in Tokyo, Japan.",
    availableDates: ["5-1-2025", "2-1-2025", "7-2-2025"],
    photo: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=500",
    featured: true,
    reviews: []
  },
  {
    title: "Holmen Lofoten",
    city: "Norway",
    distance: 500,
    price: 20000,
    maxGroupSize: 8,
    desc: "Discover the dramatic landscapes of the Lofoten Islands in Norway.",
    availableDates: ["5-1-2025", "2-1-2025", "7-2-2025"],
    photo: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500",
    featured: false,
    reviews: []
  },
  {
    title: "Cox's Bazar Sea Beach",
    city: "Chittagong",
    distance: 500,
    price: 8000,
    maxGroupSize: 8,
    desc: "Visit the world's longest natural sea beach at Cox's Bazar, Bangladesh.",
    availableDates: ["5-1-2025", "2-1-2025", "7-2-2025"],
    photo: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=500",
    featured: false,
    reviews: []
  }
];

const seedTours = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(`${process.env.MONGODB_URL}/TripGo`);
    console.log("Connected to MongoDB");

    // Clear existing tours
    await tourModel.deleteMany({});
    console.log("Cleared existing tours");

    // Insert sample tours
    const tours = await tourModel.insertMany(sampleTours);
    console.log(`Inserted ${tours.length} sample tours`);

    console.log("Sample tours seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding tours:", error);
    process.exit(1);
  }
};

seedTours();
