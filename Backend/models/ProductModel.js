
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
    validate: {
      validator: function (array) {
        return array.length > 0;
      },
      message: "At least one image is required",
    },
  },
  hotsale: {
    type: Boolean,
    default: false,
  },
  newarrival: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    required: true,
    enum: ["cosmetics", "mobile-accessories", "kitchen-accessories"],
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  categories: {
    type: [String],
    required: true,
    validate: {
      validator: function (array) {
        return array.length > 0;
      },
      message: "At least one category is required",
    },
  },
  tags: {
    type: [String],
    required: true,
    validate: {
      validator: function (array) {
        return array.length > 0;
      },
      message: "At least one tag is required",
    },
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

export const Product = mongoose.model("Product", productSchema);


