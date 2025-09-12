import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { productsData } from "../../Components/DumyProducts";

export default function ProductView() {
  const { category, id } = useParams();

  const categoryProducts = productsData[category] || [];
  const product = categoryProducts.find((p) => p.id.toString() === id.toString());

  const relatedProducts = categoryProducts.filter((p) => p.id.toString() !== id.toString());
  const sliceProducts = relatedProducts.slice(0, 3);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0] || "");

  if (!product) {
    return <p className="text-center py-20">Product not found</p>;
  }

  const handleQtyChange = (type) => {
    if (type === "inc") {
      setQuantity(Math.min(10, quantity + 1));
    } else if (type === "dec") {
      setQuantity(Math.max(1, quantity - 1));
    }
  };

  // Stock Status Message
  const stockStatus = product.inStock
    ? "Ready to Ship - In Stock"
    : "Out of Stock - Available on Backorder";

  // Estimated Delivery
  const deliveryText = "Estimated Delivery: 4 to 7 days";

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Thumbnails */}
          <div className="absolute top-50 left-6 flex flex-col space-y-2 ">
            {product.images?.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`w-32 h-32 border-2 rounded-md cursor-pointer ${
                  selectedImage === img ? 'border-brand-gold' : 'border-gray-300'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ml-10">
        {/* Left - Image Gallery */}
        <div className="relative bg-[#F2F3F0] rounded-xl overflow-hidden shadow-lg">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-[550px] rounded-2xl object-contain transition duration-300 ease-in-out"
          />

          
        </div>

        {/* Right - Content */}
        <div className="flex flex-col justify-start space-y-5">
          <div>
            <span className="text-xl text-gray-500 uppercase tracking-wide">
              {product.categories?.join(", ")}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">{product.name}</h1>
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="mt-4 text-2xl font-bold text-black">
            Rs {product.price}
          </div>

          {/* Categories & Tags */}
          <div className="mt-4">
            <p className="text-xl text-gray-500">
              <strong>Categories:</strong> {product.categories?.join(", ")}
            </p>
            <p className="text-xl text-gray-500 mt-1">
              <strong>Tags:</strong> {product.tags?.join(", ")}
            </p>
          </div>

         

          {/* Estimated Delivery */}
          <div className="mt-2 text-sm text-gray-600">
            {deliveryText}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-3 mt-6 bg-gray-200 rounded-md  w-max">
            <button
              onClick={() => handleQtyChange("dec")}
              className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-md transition"
            >
              −
            </button>
            <span className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-md transition ">{quantity}</span>
            <button
              onClick={() => handleQtyChange("inc")}
              className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-md transition"
            >
              +
            </button>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 mt-6">
            <button className="flex-1 bg-brand-gold text-white px-6 py-3 rounded-md shadow hover:bg-black transition">
              ADD TO CART
            </button>
            <button className="bg-black text-white px-6 py-3 rounded-md shadow hover:bg-gray-800 transition">
              BUY IT NOW
            </button>
          </div>
           {/* Stock Status */}
          <div className="mt-4 text-sm h-12  bg-gray-100  w-44 rounded-full">
            <span
              className={`font-medium ${
                product.inStock ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stockStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {sliceProducts.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
              <img src={item.img} alt={item.name} className="w-full h-52 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
                <p className="text-lg font-bold text-brand-gold mt-2">Rs {item.price}</p>

                <Link to={`/product/${item.category}/${item.id}`}>
                  <button className="mt-3 bg-brand-gold text-white px-4 py-2 rounded-md hover:bg-black transition">
                    View
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}