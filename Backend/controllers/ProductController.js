
import { Product } from '../models/ProductModel.js'
import asyncHandler from "express-async-handler";


export const createProduct = asyncHandler(async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILES:", req.files);

    const {
      name,
      price: priceStr,
      hotsale,
      newarrival,
      category,
      inStock,
      description,
      categories,
      tags,
    } = req.body;

    console.log("🔍 Raw req.body.price:", req.body.price, "| Type:", typeof req.body.price);
    const price = parseFloat(priceStr);
    console.log("✅ Parsed price:", price);



    if (!name || !price || !category || !description) {
      return res.status(400).json({ message: "Sab required fields bharo" });
    }

    let imageUrl = "";
    let imagesUrls = [];
    const baseUrl = `${req.protocol}://${req.get("host")}/uploads/`;

    if (req.files && req.files["image"]) {
      imageUrl = baseUrl + req.files["image"][0].filename;
    } else {
      return res.status(400).json({ message: "Primary image chahiye" });
    }

    if (req.files && req.files["images"]) {
      imagesUrls = req.files["images"].map((file) => baseUrl + file.filename);
    }

    let parsedCategories = [];
    let parsedTags = [];

    try {
      parsedCategories = typeof categories === "string" ? JSON.parse(categories) : categories;
    } catch { }
    try {
      parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
    } catch { }

    const product = await Product.create({
      name,
      price,
      image: imageUrl,
      images: imagesUrls.length > 0 ? imagesUrls : [imageUrl],
      hotsale: hotsale === "true" || hotsale,
      newarrival: newarrival === "true" || newarrival,
      category,
      inStock: inStock === "true" || inStock,
      description,
      categories: parsedCategories,
      tags: parsedTags,
    });

    res.status(201).json({ message: "Product create ho gaya", product });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Server error" });
  }
});


export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});


export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product nahi mila");
  }
  res.status(200).json(product);
});


export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price: priceStr,       // rename to avoid confusion
    hotsale,
    newarrival,
    category,
    inStock,
    description,
    categories,
    tags,
  } = req.body;

  let price;
  if (priceStr !== undefined && priceStr !== "") {
    price = parseFloat(priceStr);
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ message: "Price must be a valid number greater than 0" });
    }
  }

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
  product.hotsale =
    hotsale !== undefined ? (hotsale === "true" || hotsale) : product.hotsale;
  product.newarrival =
    newarrival !== undefined ? (newarrival === "true" || newarrival) : product.newarrival;
  product.category = category || product.category;
  product.inStock =
    inStock !== undefined ? (inStock === "true" || inStock) : product.inStock;
  product.description = description || product.description;

  // ✅ Fixed categories & tags handling
  product.categories = categories
    ? typeof categories === "string"
      ? categories.split(",").map((c) => c.trim())
      : categories
    : product.categories;

  product.tags = tags
    ? typeof tags === "string"
      ? tags.split(",").map((t) => t.trim())
      : tags
    : product.tags;

  const updatedProduct = await product.save();
  res.status(200).json({ message: "Product update ho gaya", product: updatedProduct });
});



export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    res.status(404);
    throw new Error("Product nahi mila");
  }
  res.status(200).json({ message: "Product delete ho gaya" });
});
