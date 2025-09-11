import { Truck, ShieldCheck, BadgePercent, Headphones } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Truck size={32} />,
      title: "FREE SHIPPING",
      desc: "for orders over $130",
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "PAYMENT & POLICY",
      desc: "Multiple payment methods.",
    },
    {
      icon: <BadgePercent size={32} />,
      title: "MEMBER DISCOUNT",
      desc: "Get 15% off your order",
    },
    {
      icon: <Headphones size={32} />,
      title: "QUALITY SUPPORT",
      desc: "Support Options 24/7",
    },
  ];

  return (
    <div className="bg-[#e9eeea] py-24 opacity-100">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-black text-center">
        {features.map((f, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-2"
          >
            <div className="mb-2">{f.icon}</div>
            <h3 className="font-bold uppercase">{f.title}</h3>
            <p className="text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
