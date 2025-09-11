import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { productsData } from "../../Components/DumyProducts";

export default function ProductView() {
  const { category, id } = useParams();

  // Category ka data lo
  const categoryProducts = productsData[category] || [];

  // Id se product find karo
  const product = categoryProducts.find((p) => p.id.toString() === id.toString());

  const relatedProducts = categoryProducts.filter((p) => p.id.toString() !== id.toString());
  const sliceProducts = relatedProducts.slice(0, 3);

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <p className="text-center py-20">Product not found</p>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left - Image */}
        <div className="relative bg-gray-100 rounded-xl overflow-hidden shadow-lg">
          <img src={product.img} alt={product.name} className="w-full h-[450px] object-cover" />
        </div>

        {/* Right - Content */}
        <div className="flex flex-col justify-center space-y-5">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600">{product.description || "No description available"}</p>
          <p className="text-2xl font-bold text-brand-gold">Rs {product.price}</p>

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
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {sliceProducts.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
              <img src={item.img} alt={item.name} className="w-full h-52 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.description || "No description"}</p>
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
