import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoute.js";
<<<<<<< HEAD
import cors from "cors";
import dotenv from "dotenv";

// .env variables load karne ke liye
dotenv.config();
=======
>>>>>>> 2e256f3379d60d477d5aafd09206eddc020039c2

import TestimonialRouter from "./routes/testimonialRoutes.js";

import cors from 'cors'
const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: "http://localhost:5173",
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


app.use("/api", productRoutes);
app.use("/api", TestimonialRouter);


app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Server Error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server chal raha hai port ${PORT} pe`));
