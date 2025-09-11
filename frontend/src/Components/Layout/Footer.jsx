import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-10 px-5 font-mono">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Subscribe */}
        <div>
          <h2 className="text-4xl font-bold text-brand-gold">GlamHub</h2>
        
          <p className="mt-4 text-sm">Follow Us On</p>
          <div className="flex space-x-3 mt-5">
            <FaFacebookF className="hover:text-brand-gold cursor-pointer text-xl"  />
            <FaTwitter className="hover:text-brand-gold cursor-pointer text-xl" />
            <FaInstagram className="hover:text-brand-gold cursor-pointer text-xl" />
            <FaPinterestP className="hover:text-brand-gold cursor-pointer text-xl" />
          </div>
        </div>

        {/* Pages */}
        <div>
          <h3 className="text-white font-semibold mb-3">PAGES</h3>
          <ul className="space-y-2 text-lg">
            <li>Home</li>
            <li>Cosmetics</li>
            <li>Mobile</li>
            <li>Kitchen Accessories</li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="text-white font-semibold mb-3">INFORMATION</h3>
          <ul className="space-y-2 text-lg">
            <li>Returns Policy</li>
            <li>Shipping & Return</li>
            <li>Terms & Conditions</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-white font-semibold mb-3">OUR ADDRESS</h3>
          <p>Mian Channu, Punjab, Pakistan</p>
          <p className="mt-2">(+92) 300-1234567</p>
          <p className="mt-2">info@glamub.com</p>
        </div>

      </div>
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Glamub. All rights reserved.
      </div>
    </footer>
  );
}
