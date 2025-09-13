
import {Product} from '../models/ProductModel.js'
import asyncHandler from "express-async-handler";

// @desc    Create a new product with image uploads
// @route   POST /api/product
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    hotsale,
    newarrival,
    category,
    inStock,
    description,
    categories,
    tags,
  } = req.body;

  // Check required fields
  if (!name || !price || !category || inStock === undefined || !description || !categories || !tags) {
    res.status(400);
    throw new Error("Sab required fields bharo");
  }

  // Handle image uploads
  let imageUrl = "";
  let imagesUrls = [];

  const baseUrl = `${req.protocol}://${req.get("host")}/uploads/`;

  if (req.files && req.files["image"]) {
    imageUrl = baseUrl + req.files["image"][0].filename;
  } else {
    res.status(400);
    throw new Error("Primary image (image) chahiye");
  }

  if (req.files && req.files["images"]) {
    imagesUrls = req.files["images"].map((file) => baseUrl + file.filename);
  }

  // Create new product
  const product = await Product.create({
    name,
    price,
    image: imageUrl,
    images: imagesUrls.length > 0 ? imagesUrls : [imageUrl],
    hotsale: hotsale === "true" || hotsale || false,
    newarrival: newarrival === "true" || newarrival || false,
    category,
    inStock: inStock === "true" || inStock,
    description,
    categories: typeof categories === "string" ? JSON.parse(categories) : categories,
    tags: typeof tags === "string" ? JSON.parse(tags) : tags,
  });

  res.status(201).json({ message: "Product create ho gaya", product });
});

// @desc    Get all products
// @route   GET /api/product
// @access  Public
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

// @desc    Get a single product by ID
// @route   GET /api/product/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product nahi mila");
  }
  res.status(200).json(product);
});

// @desc    Update a product with image uploads
// @route   PUT /api/product/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    hotsale,
    newarrival,
    category,
    inStock,
    description,
    categories,
    tags,
  } = req.body;

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product nahi mila");
  }

  // Handle image uploads
  const baseUrl = `${req.protocol}://${req.get("host")}/uploads/`;

  if (req.files && req.files["image"]) {
    product.image = baseUrl + req.files["image"][0].filename;
  }

  if (req.files && req.files["images"]) {
    product.images = req.files["images"].map((file) => baseUrl + file.filename);
  }

  // Update fields
  product.name = name || product.name;
  product.price = price || product.price;
  product.hotsale = hotsale !== undefined ? (hotsale === "true" || hotsale) : product.hotsale;
  product.newarrival = newarrival !== undefined ? (newarrival === "true" || newarrival) : product.newarrival;
  product.category = category || product.category;
  product.inStock = inStock !== undefined ? (inStock === "true" || inStock) : product.inStock;
  product.description = description || product.description;
  product.categories = categories ? (typeof categories === "string" ? JSON.parse(categories) : categories) : product.categories;
  product.tags = tags ? (typeof tags === "string" ? JSON.parse(tags) : tags) : product.tags;

  const updatedProduct = await product.save();
  res.status(200).json({ message: "Product update ho gaya", product: updatedProduct });
});

// @desc    Delete a product
// @route   DELETE /api/product/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    res.status(404);
    throw new Error("Product nahi mila");
  }
  res.status(200).json({ message: "Product delete ho gaya" });
});
