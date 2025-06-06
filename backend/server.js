import express from "express";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import bookingRouter from "./routes/bookingRoute.js";
import adminRouter from "./routes/adminRoutes.js";
import tourRouter from "./routes/tourRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
const cors = require('cors');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());

// Serve static files for uploaded images
app.use('/uploads', express.static('uploads'));

await connectDB();

app.use("/api/user", userRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/admin", adminRouter);
app.use("/api/tours", tourRouter);
app.use("/api/payments", paymentRouter);

app.get("/", (req, res) => {
  res.send("API is Working!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
