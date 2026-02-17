import React from "react";
import Link from "next/link";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300 py-10 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* --- Brand Section --- */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                C
              </div>
              <span className="text-2xl font-black tracking-tighter text-primary italic">
                CAR<span className="text-accent">SQUARE</span>
              </span>
            </Link>
            <p className="text-sm opacity-70 leading-relaxed">
              Experience the next generation of car buying and selling. We provide premium vehicles with unmatched service and reliability.
            </p>
            <div className="flex gap-4">
              <a href="#" className="btn btn-sm btn-circle btn-primary btn-outline hover:text-white"><FaFacebookF /></a>
              <a href="#" className="btn btn-sm btn-circle btn-primary btn-outline hover:text-white"><FaTwitter /></a>
              <a href="#" className="btn btn-sm btn-circle btn-primary btn-outline hover:text-white"><FaInstagram /></a>
              <a href="#" className="btn btn-sm btn-circle btn-primary btn-outline hover:text-white"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* --- Quick Links --- */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-primary">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/inventory" className="hover:text-primary transition-colors">Browse Inventory</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Our Services</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/sell-car" className="hover:text-primary transition-colors">Sell Your Car</Link></li>
            </ul>
          </div>

          {/* --- Support --- */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-primary">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* --- Contact Info --- */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-primary">Contact Info</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-accent mt-1" />
                <span>123 Auto Plaza, Dhaka,<br />Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-accent" />
                <span>+880 1234 567 890</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-accent" />
                <span>support@carsquare.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <div className="border-t border-base-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-60">
          <p>© {new Date().getFullYear()} CARSQUARE. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-primary cursor-pointer">Security</span>
            <span className="hover:text-primary cursor-pointer">Sitemap</span>
            <span className="hover:text-primary cursor-pointer">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;