import { FaFacebookF, FaTwitter, FaInstagram, FaTiktok, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-yellow-50 relative overflow-hidden pt-16 pb-10 px-5">
      {/* Subtle Diagonal Accent Lines (Pure CSS) */}
      <div className="absolute top-0 left-0 w-full h-16">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">

        {/* ─── BRAND + SOCIAL ───────────────────────────────────────────── */}
        <div className="space-y-8">
          <div className="flex items-center space-x-3">
            {/* Brand Icon */}
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-2xl border-2 border-yellow-300">
              <span className="text-black font-black text-xl">GH</span>
            </div>
            {/* Brand Name */}
            <h2 className="text-4xl font-black bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              GlamHub
            </h2>
          </div>

          <p className="text-yellow-100 leading-relaxed max-w-xs text-sm md:text-base">
            Beauty. Tech. Home. Delivered with passion — for you.
          </p>

          <div>
            <h4 className="text-yellow-200 font-bold text-xs tracking-wider uppercase mb-4">Follow GlamHub</h4>
            <div className="flex space-x-4">
              {[
                { icon: <FaFacebookF />, link: "https://facebook.com/yourpage", label: "Facebook" },
                { icon: <FaInstagram />, link: "https://instagram.com/yourhandle", label: "Instagram" },
                { icon: <FaTwitter />, link: "https://twitter.com/yourhandle", label: "Twitter" },
                { icon: <FaTiktok />, link: "https://tiktok.com/@yourhandle", label: "TikTok" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-yellow-500 hover:bg-yellow-400 text-black flex items-center justify-center rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-110 hover:rotate-6 shadow-lg hover:shadow-yellow-500/40"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ─── PAGES ────────────────────────────────────────────────────── */}
        <div>
          <h3 className="text-yellow-300 font-black text-lg mb-6 pb-2 border-b-2 border-yellow-500 inline-block">PAGES</h3>
          <ul className="space-y-3">
            {[
              { name: "Home", path: "/" },
              { name: "Cosmetics", path: "/shop/cosmetics" },
              { name: "Mobile Accessories", path: "/shop/mobile-accessories" },
              { name: "Kitchen Accessories", path: "/shop/kitchen-accessories" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="flex items-center space-x-3 group text-yellow-100 hover:text-yellow-300 transition-all duration-300 py-1"
                >
                  <span className="w-2 h-0.5 bg-yellow-500 group-hover:w-8 transition-all duration-300 origin-left"></span>
                  <span className="font-medium group-hover:translate-x-1 transition-transform">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ─── INFORMATION ──────────────────────────────────────────────── */}
        <div>
          <h3 className="text-yellow-300 font-black text-lg mb-6 pb-2 border-b-2 border-yellow-500 inline-block">INFO</h3>
          <ul className="space-y-3">
            {[
              "Returns Policy",
              "Shipping & Delivery",
              "Terms & Conditions",
              "FAQ",
              "Contact Us",
            ].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="flex items-center space-x-3 group text-yellow-100 hover:text-yellow-300 transition-all duration-300 py-1"
                >
                  <span className="w-2 h-0.5 bg-yellow-500 group-hover:w-8 transition-all duration-300 origin-left"></span>
                  <span className="font-medium group-hover:translate-x-1 transition-transform">{item}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ─── CONTACT ──────────────────────────────────────────────────── */}
        <div>
          <h3 className="text-yellow-300 font-black text-lg mb-6 pb-2 border-b-2 border-yellow-500 inline-block">CONTACT</h3>
          <div className="space-y-5 text-yellow-100">
            <div className="flex items-start space-x-3 group">
              <FaMapMarkerAlt className="text-yellow-400 mt-1 flex-shrink-0 w-5 h-5 group-hover:scale-110 transition-transform" />
              <p className="text-sm leading-relaxed group-hover:text-yellow-300 transition-colors">
                Mian Channu, Punjab, Pakistan
              </p>
            </div>
            <div className="flex items-center space-x-3 group">
              <FaPhoneAlt className="text-yellow-400 w-5 h-5 group-hover:scale-110 transition-transform" />
              <a
                href="tel:+923001234567"
                className="hover:text-yellow-300 transition-colors text-sm font-medium"
              >
                (+92) 300-1234567
              </a>
            </div>
            <div className="flex items-center space-x-3 group">
              <FaEnvelope className="text-yellow-400 w-5 h-5 group-hover:scale-110 transition-transform" />
              <a
                href="mailto:info@glamhub.com"
                className="hover:text-yellow-300 transition-colors text-sm font-medium"
              >
                info@glamhub.com
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* ─── COPYRIGHT ────────────────────────────────────────────────── */}
      <div className="text-center text-yellow-300 mt-16 pt-8 border-t border-yellow-900/40 relative z-10">
        <p className="text-sm font-medium">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-yellow-400 font-black">GlamHub</span> — Crafted with 🔥 in Pakistan.
        </p>
      
      </div>

      {/* Floating Yellow Accent Dot (Pure Decor) */}
      <div className="hidden lg:block absolute -bottom-10 -right-10 w-72 h-72 bg-yellow-500 rounded-full opacity-5 blur-3xl"></div>
    </footer>
  );
}