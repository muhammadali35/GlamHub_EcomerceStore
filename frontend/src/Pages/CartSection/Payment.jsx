import React, { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useShop } from "../../context/ShopContext";
import mastercard from "../../assets/mastercard.png";
import jazzcash from "../../assets/jazzcash.png";
import easypaisa from "../../assets/easypaisa.png";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navState = location.state || {};

  const [screenshot, setScreenshot] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const { setCart } = useShop();

  const orderId = navState.orderId || `ORDER_${Date.now()}`;
  const cart = navState.cart || [];
  const quantities = navState.quantities || {};
  const customerInfo = navState.customerInfo || {};
  const paymentMethod = "online";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setScreenshot(file);
      toast.success("✅ Payment proof uploaded!", { autoClose: 1800 });
    } else {
      toast.error("❌ Please upload a valid image (PNG/JPG).");
    }
  };

  const copyToClipboard = useCallback(async (number, index) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopiedIndex(index);
      toast.success("📋 Copied to clipboard!", { autoClose: 1200 });
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch (err) {
      toast.error("Failed to copy. Try manually.");
    }
  }, []);


  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
      formData.append("customerInfo", JSON.stringify(customerInfo));
      formData.append("paymentMethod", paymentMethod);
      if (screenshot) formData.append("screenshot", screenshot);

      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      localStorage.removeItem("cart");
      setCart([]);

      localStorage.removeItem("customerInfo");

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

  // ✅ Updated — using actual logos
  const paymentAccounts = [
    {
      name: "JazzCash",
      number: "0327-4276914",
      holder: "Muzammal Irshaad",
      iconSrc: jazzcash,
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
    {
      name: "EasyPaisa",
      number: "0341-0446509",
      holder: "Muzammal Irshaad",
      iconSrc: easypaisa,
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
    {
      name: "Meezan Bank",
      number: "2677-0110-0065-96",
      holder: "Muzammal Irshaad",
      iconSrc: mastercard,
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
  ];

  if (isConfirmed) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-50 p-4">
        <div className="text-center p-8 md:p-10 bg-white rounded-3xl shadow-xl max-w-md mx-4 border border-yellow-100 animate-fade-in">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-5 animate-pulse-slow">
            <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Payment Received!</h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Thank you! Your order is now <strong className="text-yellow-600">pending verification</strong>.<br />
            We’ll process it within <strong>24 hours</strong> and contact you.
          </p>
          <div className="px-4 py-3 bg-yellow-50 rounded-xl border border-yellow-200">
            <p className="text-sm text-yellow-800 font-medium flex items-center justify-center gap-2">
              📞 Expect a WhatsApp message for delivery confirmation.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-8 px-4">
      <ToastContainer
        position="top-center"
        autoClose={2200}
        hideProgressBar
        theme="light"
        closeButton={false}
        limit={3}
      />

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-yellow-100">

          {/* Hero Header */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-7 text-white text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full mb-3">
              💳
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Complete Your Payment</h1>
            <p className="text-yellow-100 text-base max-w-2xl mx-auto opacity-95">
              Transfer funds to any account below. Upload screenshot to confirm — we’ll handle the rest!
            </p>
          </div>

          <div className="p-6 md:p-8 space-y-8">

            {/* Payment Methods */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-5 text-center">
                Transfer to Any Account Below
              </h2>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {paymentAccounts.map((acc, index) => (
                  <div
                    key={index}
                    role="button"
                    tabIndex={0}
                    className={`${acc.bg} ${acc.border} border-2 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1 overflow-hidden relative`}
                    onClick={() => copyToClipboard(acc.number, index)}
                    onKeyDown={(e) => e.key === "Enter" && copyToClipboard(acc.number, index)}
                  >
                    {/* Visual feedback on copy */}
                    {copiedIndex === index && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-10">
                        <span className="text-green-600 font-bold flex items-center gap-1">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied!
                        </span>
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                        <img
                          src={acc.iconSrc}
                          alt={`${acc.name} logo`}
                          className="w-full h-full object-scale-down"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 text-lg">{acc.name}</h3>
                        <p className="text-xs text-gray-600 mt-1.5">
                          <span className="font-medium">A/C No:</span>{" "}
                          <span className="font-mono bg-white px-2 py-1 rounded text-xs shadow-sm border border-yellow-100">
                            {acc.number}
                          </span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1 truncate">Holder: {acc.holder}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-yellow-300 rounded-2xl p-8 text-center bg-yellow-50 hover:bg-yellow-100 transition-colors duration-300 group">
              <svg
                className="mx-auto h-14 w-14 text-yellow-500 mb-4 transition-transform group-hover:rotate-12 group-hover:scale-105"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M7 16a4 4 0 01-.88-7.88 2 2 0 012.16 2.16A4 4 0 0116 16M4 8v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4H8a4 4 0 00-4 4z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="text-xl font-bold text-gray-800 mb-2"> Upload Payment Screenshot</h3>
              <p className="text-gray-600 mb-5 text-sm">PNG, JPG, JPEG — Max 5MB</p>

              <label
                htmlFor="screenshot-upload"
                className="cursor-pointer bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-7 py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.03]"
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
                <div className="mt-5 flex items-center justify-center gap-2.5 bg-white py-2.5 px-5 rounded-lg border border-yellow-200 shadow-sm max-w-max mx-auto">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-800 font-medium text-sm truncate max-w-[180px] md:max-w-xs">
                    {screenshot.name.length > 20 ? `${screenshot.name.slice(0, 18)}...` : screenshot.name}
                  </span>
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
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-2xl p-4 text-center">
              <p className="text-yellow-800 font-medium text-sm leading-relaxed">
                ⏱️ <strong>Orders verified within 24 hours.</strong> We’ll WhatsApp you for delivery!
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;