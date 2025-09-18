import { ShieldCheck, Headphones, Truck } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Truck size={32} className="text-yellow-500" />,
      title: "FAST DELIVERY",
      desc: "Get your order in 3-5 business days",
    },
    {
      icon: <ShieldCheck size={32} className="text-green-500" />,
      title: "SECURE CHECKOUT",
      desc: "Multiple safe & trusted payment methods",
    },
    {
      icon: <Headphones size={32} className="text-blue-500" />,
      title: "24/7 SUPPORT",
      desc: "We’re here to help anytime you need",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-800 text-center">
          {features.map((f, index) => (
            <div
              key={index}
              className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Icon */}
              <div className="flex justify-center mb-5">
                <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-md">
                  {f.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-extrabold text-xl text-gray-900 mb-2 tracking-tight group-hover:text-yellow-600 transition-colors">
                {f.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;