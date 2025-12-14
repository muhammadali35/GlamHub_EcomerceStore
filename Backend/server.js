import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoute.js";
import TestimonialRouter from "./routes/testimonialRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoute.js";
import dotenv from "dotenv";
import cors from "cors";
import http from "http"; // ✅ Add this
import { Server } from "socket.io"; // ✅ Add this

dotenv.config();

const app = express();
const server = http.createServer(app); // ✅ Wrap Express with HTTP server

// ✅ Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173", // React frontend (user side)
      "http://localhost:5174"  // React admin panel
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }
});

// ✅ Handle Socket Connections
io.on("connection", (socket) => {
  console.log("Admin connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Admin disconnected:", socket.id);
  });
});

// ✅ Function to emit new order to all connected admins
export const emitNewOrder = (orderData) => {
  io.emit("new-order", orderData); // Sabhi connected admins ko bhej dega
};

// Middleware & Routes
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// MongoDB connect
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/api", productRoutes);
app.use("/api", TestimonialRouter);
app.use("/api/review", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Server Error",
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server chal raha hai port ${PORT} pe`)); // ✅ Note: server.listen, not app.listen