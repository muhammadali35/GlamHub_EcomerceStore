import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoute.js";
import TestimonialRouter from "./routes/testimonialRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"; // ✅ .js extension required in import


import dotenv from "dotenv";  
import cors from "cors";


dotenv.config();




const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));


  dotenv.config();


app.use(
  cors({
    origin: [
      "http://localhost:5173"
      ,"http://localhost:5174"
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


app.use("/api", productRoutes);
app.use("/api", TestimonialRouter);
app.use("/api/review", reviewRoutes);
app.use("/api/orders", orderRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Server Error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server chal raha hai port ${PORT} pe`));
