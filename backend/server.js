import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import bookingRouter from "./routes/bookingRoute.js";
import adminRouter from "./routes/adminRoutes.js";
import tourRouter from "./routes/tourRoutes.js";

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());
await connectDB();

app.use("/api/user", userRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/admin", adminRouter);
app.use("/api/tours", tourRouter);

app.get("/", (req, res) => {
  res.send("API is Working!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
