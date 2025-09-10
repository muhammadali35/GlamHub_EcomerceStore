import { useState } from "react";
import { useParams } from "react-router-dom";

import Kitchen from "./../../assets/Kitchen1.jpg";
import { Link } from "react-router-dom";
import { productsData } from "../../Components/DumyProducts";

// Dummy products


export default function ProductView() {
  const { category, id } = useParams();
  const product = productsData[category]?.find((p) => p.id === parseInt(id));
  const relatedProducts = productsData[category]?.filter((p) => p.id !== parseInt(id)) || [];
  const sliceProducts = relatedProducts.slice(0, 3); // Show only 3 related products

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <p className="text-center py-20">Product not found</p>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side - Image */}
        <div className="relative bg-gray-100 rounded-xl overflow-hidden shadow-lg">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-[450px] object-cover"
          />
          {/* Image Navigation Arrows */}
          <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-brand-gold hover:text-white transition">
            ◀
          </button>
          <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-brand-gold hover:text-white transition">
            ▶
          </button>
        </div>

        {/* Right Side - Content */}
        <div className="flex flex-col justify-center space-y-5">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-2xl font-bold text-brand-gold">${product.price}</p>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <label className="font-medium">Quantity:</label>
            <input
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(Math.min(10, Math.max(1, e.target.value)))}
              className="w-20 border rounded-md px-3 py-2 text-center"
            />
          </div>

          <button className="bg-brand-gold text-white px-6 py-3 rounded-md shadow hover:bg-black transition w-40">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
    {/* Related Products */}
<div className="mt-16">
  <h2 className="text-2xl font-bold mb-6">Related Products</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {sliceProducts.map((item) => (
      <div
        key={item.id}
        className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
      >
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-52 object-cover"
        />
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-500 text-sm">{item.description}</p>
          <p className="text-lg font-bold text-brand-gold mt-2">
            ${item.price}
          </p>

          {/* View Button with Link */}
          <Link to={`/product/${category}/${item.id}`}>
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
