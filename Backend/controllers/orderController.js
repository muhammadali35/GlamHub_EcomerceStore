import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const nodemailer = require('nodemailer');
import Order from "../models/Order.js";
import { emitNewOrder } from "../server.js";

console.log("✅ Nodemailer Loaded:", !!nodemailer);
console.log("✅ createTransporter is Function:", typeof nodemailer.createTransporter === 'function');
console.log("✅ Nodemailer Version:", nodemailer.version);

export const submitOrder = async (req, res) => {
  try {
    console.log("Incoming order data:", req.body);


    const { cart, quantities, customerInfo, paymentMethod, orderId } = req.body;

    // Basic presence checks
    if (!cart || !quantities || !customerInfo || !paymentMethod) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // If online payment, require screenshot file
    if (paymentMethod === "online" && !req.file) {
      return res.status(400).json({ error: "Screenshot is required for online payments." });
    }

    // Parse incoming JSON strings (they arrive as strings from form-data)
    let parsedCart, parsedQuantities, parsedCustomerInfo;
    try {
      parsedCart = JSON.parse(cart);
      parsedQuantities = JSON.parse(quantities);
      parsedCustomerInfo = JSON.parse(customerInfo);
    } catch (e) {
      return res.status(400).json({ error: "Invalid JSON data." });
    }

    // If quantities object is empty, build default quantities (1 each)
    const hasQuantities =
      parsedQuantities && Object.keys(parsedQuantities).length > 0;
    const finalQuantities = hasQuantities
      ? parsedQuantities
      : parsedCart.reduce((acc, item) => {
        acc[item.id] = 1;
        return acc;
      }, {});

    // Calculate total (safe guards if price missing)
    const totalAmount = parsedCart.reduce((sum, item) => {
      const qty = finalQuantities[item.id] ?? 1;
      const price = Number(item.price) || 0;
      return sum + price * qty;
    }, 0);


    const newOrder = new Order({
      orderId: orderId || `ORDER-${Date.now()}`,
      paymentMethod,
      customerInfo: parsedCustomerInfo,
      cart: parsedCart,
      quantities: finalQuantities,
      totalAmount,
      screenshot: req.file ? `/uploads/${req.file.filename}` : undefined,
      status: "pending",
    });

    await newOrder.save();

    console.log("✅ New Order Created:", newOrder.orderId);

    // ✅ 🚨 REAL-TIME NOTIFICATION FOR ADMIN — ye block add karo
    emitNewOrder({
      id: newOrder._id,
      orderId: newOrder.orderId,
      customer: parsedCustomerInfo.name || "Unknown Customer",
      phone: parsedCustomerInfo.phone || "N/A",
      total: totalAmount,
      paymentMethod: paymentMethod,
      timestamp: new Date()
    });

    console.log("✅ New Order Created:", newOrder.orderId);


// ✅ Email — ab 100% kaam karega
try {
  const nodemailer = await import('nodemailer'); // ✅ Dynamic Import — ES Module compatible
  // ✅ Correct
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'walihaiderjalali1407@gmail.com',
      pass: 'ukiy xofl qfvy uoaz' // ✅ App Password
    }
  });

  const mailOptions = {
    from: '"GlamHub Orders" <walihaiderjalali1407@gmail.com>',
    to: 'walihaiderjalali1407@gmail.com',
    subject: `🚨 New Order #${newOrder.orderId} — Rs.${totalAmount}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h3 style="color: #4f46e5; text-align: center;">🛍️ New Order Received</h3>
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <p><strong>📅 Order ID:</strong> ${newOrder.orderId}</p>
          <p><strong>📞 Phone:</strong> ${parsedCustomerInfo.phone || "N/A"}</p>
          <p><strong>🏠 Address:</strong> ${parsedCustomerInfo.address || "N/A"}, ${parsedCustomerInfo.city || "N/A"}</p>
          <p><strong>💳 Payment Method:</strong> ${paymentMethod}</p>
          <p><strong>🕒 Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <p style="text-align: center; color: #6b7280; font-size: 14px;">
          Login to admin panel to manage this order.
        </p>
      </div>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Email Error:', error);
    } else {
      console.log('✅ Email Sent:', info.response);
    }
  });

} catch (emailError) {
  console.error('❌ Failed to load nodemailer:', emailError);
}



    res.status(201).json({
      success: true,
      message: "Order submitted successfully!",
      orderId: newOrder.orderId,
    });
  } catch (error) {
    console.error("❌ Order Submission Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};


// ✅ Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// ✅ Get single order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

// ✅ Delete order by ID
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
};

// ✅ Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "verified", "shipped", "delivered", "cancelled"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ error: "Order not found" });

    res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    res.status(500).json({ error: "Failed to update order status" });
  }
};


