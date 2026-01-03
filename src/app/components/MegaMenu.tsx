import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, Heart, Gift, Leaf } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute left-0 right-0 top-0 bg-white shadow-2xl border-t-4 border-[#1ED2AF] z-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-5 gap-8">
          {/* Column 1: Women's */}
          <div>
            <h3 className="font-bold text-[#111111] mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#1ED2AF]" />
              Women's
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/collection/womens-sweaters" 
                  onClick={onClose}
                  className="text-gray-700 hover:text-[#1ED2AF] transition-colors text-sm"
                >
                  Sweaters & Cardigans
                </Link>
              </li>
              <li>
                <Link 
                  to="/collection/womens-knitwear" 
                  onClick={onClose}
                  className="text-gray-700 hover:text-[#1ED2AF] transition-colors text-sm"
                >
                  Knitwear
                </Link>
              </li>
              <li>
                <Link 
                  to="/collection/womens-coats" 
                  onClick={onClose}
                  className="text-gray-700 hover:text-[#1ED2AF] transition-colors text-sm"
                >
                  Coats & Jackets
                </Link>
              </li>
              <li>
                <Link 
                  to="/collection/womens-dresses" 
                  onClick={onClose}
                  className="text-gray-700 hover:text-[#1ED2AF] transition-colors text-sm"
                >
                  Dresses
                </Link>
              </li>
              <li>
                <Link 
                  to="/collection/womens-loungewear" 
                  onClick={onClose}
                  className="text-gray-700 hover:text-[#1ED2AF] transition-colors text-sm"
                >
                  Loungewear
                </Link>
              </li>
              <li>
                <Link 
                  to="/collection/womens-all" 
                  onClick={onClose}
                  className="text-[#1ED2AF] hover:text-[#111111] transition-colors text-sm font-semibold mt-2 inline-block"
                >
                  Shop All Women's →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Men's */}
          <div>
            <h3 className="font-bold text-[#111111] mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#C7A14A]" />
              Men's
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/collection/mens-sweaters" 
                  onClick={onClose}
                  className="text-gray-700 hover:text-[#1ED2AF] transition-colors text-sm"
                >
                  Sweaters & Pullovers
                </Link>
              </li>
              <li>
                <Link 
                  to="/collection/mens-hoodies" 
                  onClick={onClose}
                  className="text-gray-700 hover:text-[#1ED2AF] transition-colors text-sm"
                >
                  Hoodies & Sweatshirts
                </Link>
              </li>
              <li>
                <Link 
                  to="/collection/mens-jackets" 
                  onClick={onClose}
                  className="text-gray-700 hover:text-[#1ED2AF] transition-colors text-sm"
                >
                  Jackets & Outerwear
                </Link>
              </li>
              <li>
                <Link 
                  to="/collection/mens-shirts" 
                  onClick={onClose}
                  className="text-gray-700 hover:text-[#1ED2AF] transition-colors text-sm"
                >
                  Shirts
                </Link>
              </li>
              <li>
                <Link 
                  to="/collection/mens-accessories" 
                  onClick={onClose}
                  className="text-gray-700 hover:text-[#1ED2AF] transition-colors text-sm"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link 
                  to="/collection/mens-all" 
                  onClick={onClose}
                  className="text-[#1ED2AF] hover:text-[#111111] transition-colors text-sm font-semibold mt-2 inline-block"
                >
                  Shop All Men's →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Collections */}
          <div>
            <h3 className="font-bold text-[#111111] mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#1ED2AF]" />
              Collections
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/collection/new-arrivals" 
                  onClick={onClose}
                  className="text-gray-700 hover:text-[#1ED2AF] transition-colors text-sm flex items-center gap-1"
                >
                  <span className="bg-[#1ED2AF] text-white text-xs px-2 py-0.5 rounded">NEW</span>
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link 
                  to="/collection/bestsellers" 
                  onClick={onClose}
                  className="text-gray-700 hover:text-[#1ED2AF] transition-colors text-sm flex items-center gap-1"
                >
                  <span className="bg-[#C7A14A] text-white text-xs px-2 py-0.5 rounded">HOT</span>
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link 
                  to="/collection/winter-essentials" 
                  onClick={onClose}
                  className="text-gray-700 hover:text-[#1ED2AF] transition-colors text-sm"
                >
                  Winter Essentials
                </Link>
              </li>
              <li>
                <Link 
                  to="/collection/luxury-cashmere" 
                  onClick={onClose}
                  className="text-gray-700 hover:text-[#1ED2AF] transition-colors text-sm"
                >
                  Luxury Cashmere
                </Link>
              </li>
              <li>
                <Link 
                  to="/collection/sustainable" 
                  onClick={onClose}
                  className="text-gray-700 hover:text-[#1ED2AF] transition-colors text-sm flex items-center gap-1"
                >
                  <Leaf className="w-3 h-3 text-green-600" />
                  Sustainable Edit
                </Link>
              </li>
              <li>
                <Link 
                  to="/collection/limited-edition" 
                  onClick={onClose}
                  className="text-gray-700 hover:text-[#1ED2AF] transition-colors text-sm"
                >
                  Limited Edition
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Accessories */}
          <div>
            <h3 className="font-bold text-[#111111] mb-4 flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#C7A14A]" />
              Accessories
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/collection/bags" 
                  onClick={onClose}
                  className="text-gray-700 hover:text-[#1ED2AF] transition-colors text-sm"
                >
                  Bags & Totes
                </Link>
              </li>
              <li>
                <Link 
                  to="/collection/scarves" 
                  onClick={onClose}
                  className="text-gray-700 hover:text-[#1ED2AF] transition-colors text-sm"
                >
                  Scarves & Wraps
                </Link>
              </li>
              <li>
                <Link 
                  to="/collection/hats" 
                  onClick={onClose}
                  className="text-gray-700 hover:text-[#1ED2AF] transition-colors text-sm"
                >
                  Hats & Beanies
                </Link>
              </li>
              <li>
                <Link 
                  to="/collection/gloves" 
                  onClick={onClose}
                  className="text-gray-700 hover:text-[#1ED2AF] transition-colors text-sm"
                >
                  Gloves
                </Link>
              </li>
              <li>
                <Link 
                  to="/collection/jewelry" 
                  onClick={onClose}
                  className="text-gray-700 hover:text-[#1ED2AF] transition-colors text-sm"
                >
                  Jewelry
                </Link>
              </li>
              <li>
                <Link 
                  to="/collection/accessories-all" 
                  onClick={onClose}
                  className="text-[#1ED2AF] hover:text-[#111111] transition-colors text-sm font-semibold mt-2 inline-block"
                >
                  Shop All Accessories →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Featured Image & Promo */}
          <div className="bg-gradient-to-br from-[#F5F3EE] to-white rounded-lg p-6">
            <div className="mb-4">
              <img 
                src="https://images.unsplash.com/photo-1760140175771-9d988079e396?w=400&h=300&fit=crop" 
                alt="Featured Collection" 
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
            </div>
            <h4 className="font-bold text-[#111111] mb-2">Winter Collection</h4>
            <p className="text-sm text-gray-600 mb-4">
              Discover our curated selection of premium winter essentials
            </p>
            <Link 
              to="/collection/winter-essentials" 
              onClick={onClose}
              className="block w-full bg-[#1ED2AF] text-white text-center py-2 rounded-lg hover:bg-[#19b899] transition-colors text-sm font-semibold"
            >
              Shop Winter Collection
            </Link>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-2">Free Shipping Over £50</p>
              <p className="text-xs text-gray-600">30-Day Returns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}