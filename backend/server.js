import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import bookingRouter from "./routes/bookingRoute.js";
import adminRouter from "./routes/adminRoutes.js";
import tourRouter from "./routes/tourRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";


const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors({
  origin: [
    'https://trip-go-rose.vercel.app',     // your deployed frontend
    'http://localhost:5173',               // for local development
    'https://localhost:5173',              // for local development with HTTPS
    process.env.FRONTEND_URL,              // dynamic frontend URL from env
    /^https:\/\/.*\.vercel\.app$/,         // any Vercel app
    /^https:\/\/.*\.netlify\.app$/,        // any Netlify app
    /^https:\/\/.*\.render\.com$/          // any Render app
  ].filter(Boolean), // Remove undefined values
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Serve static files for uploaded images
app.use('/uploads', express.static('uploads'));

await connectDB();

app.use("/api/user", userRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/admin", adminRouter);
app.use("/api/tours", tourRouter);
app.use("/api/payments", paymentRouter);

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    message: "TripGo API is Working!",
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack })
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`🚀 TripGo Backend Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/`);
});
