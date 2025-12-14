import { FaFacebookF, FaInstagram, FaTiktok, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-yellow-50 relative overflow-hidden pt-16 pb-10 px-4 sm:px-6 lg:px-8">
      {/* Subtle Diagonal Accent Lines */}
      <div className="absolute top-0 left-0 w-full h-16">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 relative z-10">

        {/* ─── BRAND + SOCIAL ───────────────────────────────────────────── */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-2xl border-2 border-yellow-300">
              <span className="text-black font-black text-xl">GH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              GlamHub
            </h2>
          </div>

          <p className="text-yellow-100 leading-relaxed text-sm sm:text-base max-w-xs">
            Where beauty meets tech & home — all in one glam hub, just for you.
          </p>

          <div>
            <h4 className="text-yellow-200 font-bold text-xs tracking-wider uppercase mb-3">Follow Us</h4>
            <div className="flex flex-wrap gap-3">
              {[
                { 
                  icon: <FaFacebookF />, 
                  link: "https://www.facebook.com/share/1A7ugmdk1D/", 
                  label: "Facebook" 
                },
                { 
                  icon: <FaInstagram />, 
                  link: "https://www.instagram.com/invites/contact/?igsh=twkhr60g78vb&utm_content=z1131wd", 
                  label: "Instagram" 
                },
                { 
                  icon: <FaTiktok />, 
                  link: "https://www.tiktok.com/@glam.hub49?_r=1&_t=ZS-91wkAoHYxBn", 
                  label: "TikTok" 
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 bg-yellow-500 hover:bg-yellow-400 text-black flex items-center justify-center rounded-xl text-base font-bold transition-all duration-300 transform hover:scale-110 hover:rotate-3 shadow-md hover:shadow-yellow-500/40"
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
          <h3 className="text-yellow-300 font-black text-lg mb-5 pb-2 border-b-2 border-yellow-500 inline-block">Quick Links</h3>
          <ul className="space-y-2.5">
            {[
              { name: "Home", path: "/" },
              { name: "Cosmetics", path: "/shop/cosmetics" },
              { name: "Mobile Accessories", path: "/shop/mobile-accessories" },
              { name: "Kitchen Accessories", path: "/shop/kitchen-accessories" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="flex items-center space-x-2.5 group text-yellow-100 hover:text-yellow-300 transition-all duration-300 py-1 text-sm sm:text-base"
                >
                  <span className="w-1.5 h-0.5 bg-yellow-500 group-hover:w-6 transition-all duration-300 origin-left"></span>
                  <span className="font-medium group-hover:ml-1 transition-transform">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ─── CONTACT ──────────────────────────────────────────────────── */}
        <div className="lg:col-span-2">
          <h3 className="text-yellow-300 font-black text-lg mb-5 pb-2 border-b-2 border-yellow-500 inline-block">Get In Touch</h3>
          <div className="space-y-4 text-yellow-100 text-sm sm:text-base">
            <div className="flex items-start space-x-3 group">
              <FaMapMarkerAlt className="text-yellow-400 mt-1 flex-shrink-0 w-5 h-5 group-hover:scale-110 transition-transform" />
              <p className="leading-relaxed group-hover:text-yellow-300 transition-colors">
                Abdullah Town, Street #4, Mian Channu, Punjab, Pakistan
              </p>
            </div>
            <div className="flex items-center space-x-3 group">
              <FaPhoneAlt className="text-yellow-400 w-5 h-5 group-hover:scale-110 transition-transform" />
              <a
                href="tel:+923410446509"
                className="hover:text-yellow-300 transition-colors font-medium"
              >
                0341-0446509
              </a>
            </div>
            <div className="flex items-center space-x-3 group">
              <FaEnvelope className="text-yellow-400 w-5 h-5 group-hover:scale-110 transition-transform" />
              <a
                href="mailto:muzammalahmad159@gmail.com"
                className="hover:text-yellow-300 transition-colors font-medium"
              >
                muzammalahmad159@gmail.com
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* ─── COPYRIGHT ────────────────────────────────────────────────── */}
      <div className="text-center text-yellow-300 mt-12 pt-6 border-t border-yellow-900/40 relative z-10">
        <p className="text-xs sm:text-sm font-medium">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-yellow-400 font-black">GlamHub</span> — Crafted with ❤️ in Pakistan.
        </p>
      </div>

      {/* Decorative Glow */}
      <div className="hidden lg:block absolute -bottom-8 -right-8 w-64 h-64 bg-yellow-500 rounded-full opacity-5 blur-3xl"></div>
    </footer>
  );
}