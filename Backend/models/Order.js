// models/OrderModel.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    customerInfo: {
      type: Object,
      required: true,
    },
    cart: {
      type: Array,
      required: true,
    },
    quantities: {
      type: Object,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
   screenshot: { type: String, required: false },
    status: {
      type: String,
      enum: ["pending", "verified", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order; // ✅ DEFAULT EXPORT — yeh line add karo