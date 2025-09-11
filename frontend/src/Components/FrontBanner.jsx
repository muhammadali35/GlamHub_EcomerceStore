import { Link } from "react-router-dom";

const FrontBanner = ({ title, bgImage }) => {
  return (
    <div
      className="relative h-60 flex items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative container mx-auto px-6 text-white">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="flex items-center gap-2 mt-2 text-sm">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <span>›</span>
          <span className="text-brand-gold">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default FrontBanner;
