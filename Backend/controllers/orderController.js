import Order from "../models/Order.js"; 

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


