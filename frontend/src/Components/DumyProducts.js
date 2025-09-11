// import cosmatic from "./../assets/cosmat1.jpg";
// import cosp1 from "./../assets/cosp2.png";
import mobile from "./../assets/mobile1.jpg";
import Kitchen from "./../assets/Kitchen1.jpg";
import perfum from "./../assets/perfum.webp";

export const productsData = {
  cosmetics: [
    { id: 1, name: "Lipstick", price: 120, img: perfum, hotsale: true, category: "cosmetics", inStock: true },
    { id: 2, name: "Face Cream", price: 450, img: perfum, newarrival: true, category: "cosmetics", inStock: true },
    { id: 3, name: "Eyeliner", price: 300, img: perfum, category: "cosmetics", inStock: false }, // ❌ Out of stock
    { id: 4, name: "Foundation", price: 800, img: perfum, category: "cosmetics", inStock: true },
    { id: 5, name: "Mascara", price: 600, img: perfum, hotsale: true, category: "cosmetics", inStock: false }, // ❌ Out of stock
    { id: 6, name: "Compact Powder", price: 1000, img: perfum, category: "cosmetics", inStock: true },
    { id: 7, name: "Nail Polish", price: 150, img: perfum, hotsale: true, category: "cosmetics", inStock: true },
    { id: 8, name: "Perfume", price: 3500, img: perfum, newarrival: true, category: "cosmetics", inStock: false }, // ❌ Out of stock
  ],

  "mobile-accessories": [
    { id: 9, name: "Phone Cover", price: 200, img: mobile, hotsale: true, category: "mobile-accessories", inStock: true },
    { id: 10, name: "Earphones", price: 1500, img: mobile, category: "mobile-accessories", inStock: true },
    { id: 11, name: "Power Bank", price: 2500, img: mobile, hotsale: true, category: "mobile-accessories", inStock: false }, // ❌
    { id: 12, name: "Wireless Charger", price: 3000, img: mobile, hotsale: true, newarrival: true, category: "mobile-accessories", inStock: true },
    { id: 13, name: "Bluetooth Speaker", price: 4000, img: mobile, category: "mobile-accessories", inStock: true },
    { id: 14, name: "Smart Watch", price: 5500, img: mobile, newarrival: true, category: "mobile-accessories", inStock: false }, // ❌
    { id: 15, name: "USB Cable", price: 300, img: mobile, category: "mobile-accessories", inStock: true },
    { id: 16, name: "Car Mount", price: 1200, img: mobile, category: "mobile-accessories", inStock: true },
  ],

  "kitchen-accessories": [
    { id: 17, name: "Knife Set", price: 2000, img: Kitchen, category: "kitchen-accessories", inStock: true },
    { id: 18, name: "Non-stick Pan", price: 2500, img: Kitchen, category: "kitchen-accessories", inStock: true },
    { id: 19, name: "Cooking Pot", price: 4000, img: Kitchen, hotsale: true, category: "kitchen-accessories", inStock: false }, // ❌
    { id: 20, name: "Pressure Cooker", price: 6500, img: Kitchen, category: "kitchen-accessories", inStock: true },
    { id: 21, name: "Chopping Board", price: 500, img: Kitchen, category: "kitchen-accessories", inStock: true },
    { id: 22, name: "Frying Pan", price: 2800, img: Kitchen, newarrival: true, category: "kitchen-accessories", inStock: false }, // ❌
    { id: 23, name: "Spatula Set", price: 700, img: Kitchen, category: "kitchen-accessories", inStock: true },
    { id: 24, name: "Glass Set", price: 2200, img: Kitchen, hotsale: true, category: "kitchen-accessories", inStock: true },
    { id: 25, name: "Dinner Set", price: 9000, img: Kitchen, hotsale: true, category: "kitchen-accessories", inStock: false }, // ❌
  ],
};
