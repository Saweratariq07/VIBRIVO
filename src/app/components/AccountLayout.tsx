import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  User, 
  Package, 
  MapPin, 
  CreditCard, 
  Truck, 
  RotateCcw, 
  FileText, 
  Gift, 
  Settings, 
  LogOut,
  Heart,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

export function AccountLayout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: User, label: 'My Account', path: '/account' },
    { icon: Package, label: 'Order History', path: '/account/orders' },
    { icon: MapPin, label: 'Address Book', path: '/account/addresses' },
    { icon: CreditCard, label: 'Payment Methods', path: '/account/payments' },
    { icon: Truck, label: 'Order Tracking', path: '/account/tracking' },
    { icon: RotateCcw, label: 'Returns & Exchanges', path: '/account/returns' },
    { icon: FileText, label: 'Invoices', path: '/account/invoices' },
    { icon: Gift, label: 'Loyalty Program', path: '/account/loyalty' },
    { icon: Heart, label: 'Wishlist', path: '/account/wishlist' },
    { icon: Settings, label: 'Settings', path: '/account/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden fixed bottom-6 right-6 z-50 bg-[#1ED2AF] text-white p-4 rounded-full shadow-lg hover:bg-[#111111] transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Sidebar Navigation */}
          <aside
            className={`
              lg:w-64 w-full bg-white rounded-lg shadow-lg p-6 h-fit lg:sticky lg:top-24
              ${isMobileMenuOpen ? 'fixed inset-0 z-40 overflow-y-auto' : 'hidden lg:block'}
            `}
          >
            <div className="mb-6">
              <h2 className="text-2xl text-[#111111] mb-2">My Account</h2>
              <p className="text-sm text-gray-600">Welcome back, Sarah!</p>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                      ${
                        isActive
                          ? 'bg-[#1ED2AF] text-white'
                          : 'text-gray-700 hover:bg-[#F5F3EE] hover:text-[#1ED2AF]'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Logout Button */}
              <button
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
                onClick={() => {
                  // Handle logout logic
                  alert('Logging out...');
                }}
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
