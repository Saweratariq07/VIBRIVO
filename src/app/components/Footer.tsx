import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, Shield, Lock, Package, CreditCard } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl mb-4 tracking-widest font-bold">VIBRIVO</h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Premium sweaters and lifestyle clothing designed for modern living. Handcrafted with care, sustainable by design.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Ethical sourcing • Sustainable fashion
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#1ED2AF] transition-colors p-2 hover:bg-gray-800 rounded-full"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#1ED2AF] transition-colors p-2 hover:bg-gray-800 rounded-full"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#1ED2AF] transition-colors p-2 hover:bg-gray-800 rounded-full"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#1ED2AF] transition-colors p-2 hover:bg-gray-800 rounded-full"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="mb-4 text-[#C7A14A]">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/collection/new" className="text-gray-400 hover:text-[#1ED2AF] transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/collection/sweaters" className="text-gray-400 hover:text-[#1ED2AF] transition-colors">
                  Sweaters
                </Link>
              </li>
              <li>
                <Link to="/collection/lifestyle" className="text-gray-400 hover:text-[#1ED2AF] transition-colors">
                  Lifestyle
                </Link>
              </li>
              <li>
                <Link to="/collection/bestsellers" className="text-gray-400 hover:text-[#1ED2AF] transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/collection/winter" className="text-gray-400 hover:text-[#1ED2AF] transition-colors">
                  Winter Essentials
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="mb-4 text-[#C7A14A]">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-[#1ED2AF] transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-[#1ED2AF] transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#1ED2AF] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#1ED2AF] transition-colors">
                  About VIBRIVO
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-gray-400 hover:text-[#1ED2AF] transition-colors">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="mb-4 text-[#C7A14A]">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-[#1ED2AF] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-[#1ED2AF] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-[#1ED2AF] transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8 pb-8 border-b border-gray-800">
            <div className="flex items-center gap-2 text-gray-400">
              <Shield className="w-5 h-5 text-[#1ED2AF]" />
              <span className="text-sm">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Lock className="w-5 h-5 text-[#1ED2AF]" />
              <span className="text-sm">SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Package className="w-5 h-5 text-[#1ED2AF]" />
              <span className="text-sm">Free Returns</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <CreditCard className="w-5 h-5 text-[#1ED2AF]" />
              <span className="text-sm">Safe Checkout</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 VIBRIVO. All rights reserved.
            </p>

            {/* Payment Icons */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="px-3 py-1 bg-[#2A2A2A] rounded font-semibold">VISA</span>
              <span className="px-3 py-1 bg-[#2A2A2A] rounded font-semibold">MASTERCARD</span>
              <span className="px-3 py-1 bg-[#2A2A2A] rounded font-semibold">PAYPAL</span>
              <span className="px-3 py-1 bg-[#2A2A2A] rounded font-semibold">APPLE PAY</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}