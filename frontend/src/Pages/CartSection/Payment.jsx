import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useShop } from "../../context/ShopContext"; // Import your context

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navState = location.state || {};

  const [screenshot, setScreenshot] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const { setCart } = useShop(); // Get setCart from context

  // ✅ Sab data location.state se lo (context se nahi)
  const orderId = navState.orderId || `ORDER_${Date.now()}`;
  const cart = navState.cart || [];
  const quantities = navState.quantities || {};
  const customerInfo = navState.customerInfo || {};
  const paymentMethod = "online";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setScreenshot(file);
      toast.success("📸 Payment proof uploaded!", { autoClose: 1800 });
    } else {
      toast.error("❌ Please upload a valid image (PNG/JPG).");
    }
  };

  const handleConfirmPayment = async () => {
    if (paymentMethod === "online" && !screenshot) {
      toast.error("⚠️ Upload payment screenshot to continue.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("orderId", orderId);
      formData.append("cart", JSON.stringify(cart));
      formData.append("quantities", JSON.stringify(quantities));
      formData.append("customerInfo", JSON.stringify(customerInfo)); // ✅ now correct
      formData.append("paymentMethod", paymentMethod);
      if (screenshot) formData.append("screenshot", screenshot);

      console.log("🚀 Sending order data:", {
        orderId,
        cart,
        quantities,
        customerInfo,
        paymentMethod,
        screenshot: screenshot?.name,
      });

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      console.log("server response", data);

       
    localStorage.removeItem("cart");
    setCart([]); // <-- Add this line to clear React cart state

      if (!response.ok) throw new Error(data.error || "Submission failed");

      setIsConfirmed(true);
      toast.success("✅ Order submitted! We’ll verify & contact you soon.", {
        autoClose: 3500,
      });
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      console.error(error);
      toast.error("❌ Something went wrong. Try again.");
    } finally {
      setUploading(false);
    }
  };

  // 🔽 UI same rehne do (tumhara code)
  // 👇👇
  const paymentAccounts = [
    {
      name: "JazzCash",
      number: "0300-1234567",
      holder: "GlamHub Store",
      icon: "📱",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
    {
      name: "EasyPaisa",
      number: "0345-7654321",
      holder: "GlamHub Store",
      icon: "💵",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
    {
      name: "UBL Omni",
      number: "123456789",
      holder: "GlamHub Store",
      icon: "🏦",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
  ];

  if (isConfirmed) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-50 p-4">
        <div className="text-center p-12 bg-white rounded-3xl shadow-2xl max-w-md mx-4 border border-yellow-100 animate-fade-in transform transition-all">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
            <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Payment Received!</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Thank you! Your order is now <strong>pending verification</strong>.<br />
            We’ll process it within <strong>24 hours</strong> and contact you.
          </p>
          <div className="px-5 py-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl border border-yellow-200">
            <p className="text-sm text-yellow-800 font-medium flex items-center justify-center gap-2">
              📞 Expect a call or WhatsApp message for delivery confirmation.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-10 px-4">
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar
        theme="light"
        closeButton={false}
      />

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-yellow-100">

          {/* Hero Header */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-8 py-8 text-white text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              💳
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Complete Your Payment</h1>
            <p className="text-yellow-100 text-lg max-w-2xl mx-auto leading-relaxed">
              Transfer funds to any account below. Upload screenshot to confirm — we’ll handle the rest!
            </p>
          </div>

          <div className="p-8 md:p-10 space-y-10">

            {/* Payment Methods */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                📲 Transfer to Any of These Accounts
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {paymentAccounts.map((acc, index) => (
                  <div
                    key={index}
                    className={`${acc.bg} ${acc.border} border-2 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1`}
                    onClick={() => {
                      navigator.clipboard.writeText(acc.number);
                      toast.info("📋 Account number copied!", { autoClose: 1200 });
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl mt-1 group-hover:scale-110 transition-transform">{acc.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-800 text-lg">{acc.name}</h3>
                          <p className="text-sm text-gray-600 mt-2">
                            <span className="font-medium">A/C No:</span>{" "}
                            <span className="font-mono bg-white px-2 py-1 rounded text-xs shadow-sm border">
                              {acc.number}
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 mt-1">Holder: {acc.holder}</p>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-yellow-300 rounded-2xl p-10 text-center hover:border-yellow-400 bg-yellow-50 hover:bg-yellow-100 transition-all duration-300 group">
              <svg
                className="mx-auto h-16 w-16 text-yellow-400 mb-4 transition-transform group-hover:rotate-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="text-xl font-bold text-gray-800 mb-2">📤 Upload Payment Screenshot</h3>
              <p className="text-gray-600 mb-6 text-sm">PNG, JPG, JPEG — Max 5MB</p>

              <label
                htmlFor="screenshot-upload"
                className="cursor-pointer bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {screenshot ? "🔁 Replace Screenshot" : "📷 Choose File"}
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="screenshot-upload"
              />

              {screenshot && (
                <div className="mt-6 flex items-center justify-center gap-3 bg-white py-3 px-6 rounded-xl border border-yellow-200 shadow-sm">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-800 font-medium truncate max-w-xs">{screenshot.name}</span>
                </div>
              )}
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirmPayment}
              disabled={!screenshot || uploading}
              className={`w-full py-5 rounded-2xl font-bold text-lg text-white shadow-lg transition-all duration-300 transform ${!screenshot || uploading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
                }`}
            >
              {uploading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Your Order...
                </span>
              ) : (
                "✅ Confirm & Place Order"
              )}
            </button>

            {/* Info Banner */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-2xl p-5 text-center">
              <p className="text-yellow-800 font-medium text-sm flex items-center justify-center gap-2">
                ⏱️ <strong>Processing Time:</strong> Orders verified within 24 hours. We’ll WhatsApp you for delivery!
              </p>
              <p className="text-yellow-700 text-xs mt-1">
                Questions? Call <strong>+92 300 1234567</strong> or email <strong>support@glamhub.com</strong>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;