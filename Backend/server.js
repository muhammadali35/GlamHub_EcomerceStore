import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoute.js";
// import TestimonialRouter from "./routes/testimonialRoutes.js";

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



mongoose
  .connect("mongodb+srv://muhammadalikatia123_db_user:mali2002@cluster0.z5hfy96.mongodb.net/?", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));


app.use("/api", productRoutes);
// app.use("/api", TestimonialRouter);


app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Server Error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server chal raha hai port ${PORT} pe`));