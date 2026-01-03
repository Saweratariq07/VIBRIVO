import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomepageEnhanced } from './components/HomepageEnhanced';
import { CollectionPage } from './components/CollectionPage';
import { NikeStyleProductPage } from './components/NikeStyleProductPage';
import { BundlePage } from './components/BundlePage';
import { ReviewsPage } from './components/ReviewsPage';
import { Cart } from './components/Cart';
import { Wishlist } from './components/Wishlist';
import { TrackOrderPage } from './components/TrackOrderPage';
import { StoresPage } from './components/StoresPage';
import { FAQPage } from './pages/FAQPage';
import { ShippingPage } from './pages/ShippingPage';
import { AccountLayout } from './components/AccountLayout';
import { MyAccount } from './components/MyAccount';
import { OrderHistory } from './components/OrderHistory';
import { AddressBook } from './components/AddressBook';
import { PaymentMethods } from './components/PaymentMethods';
import { OrderTracking } from './components/OrderTracking';
import { ReturnsExchanges } from './components/ReturnsExchanges';
import { Invoices } from './components/Invoices';
import { LoyaltyProgram } from './components/LoyaltyProgram';
import { AccountSettings } from './components/AccountSettings';
import { CurrencyProvider } from './context/CurrencyContext';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { StickyCartBar } from './components/StickyCartBar';
import { useCurrency } from './context/CurrencyContext';

function AppContent() {
  const { convertPrice } = useCurrency();

  return (
    <Router>
      <div className=" flex flex-col bg-[#F5F3EE]">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomepageEnhanced />} />
            <Route path="/collection/:category" element={<CollectionPage />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/product/:id" element={<NikeStyleProductPage />} />
            <Route path="/bundle/:id" element={<BundlePage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/track-order" element={<TrackOrderPage />} />
            <Route path="/about" element={<div className="container mx-auto px-4 py-20"><h1>About VIBRIVO</h1><p>Premium clothing brand focused on quality and sustainability.</p></div>} />
            <Route path="/contact" element={<div className="container mx-auto px-4 py-20"><h1>Contact Us</h1><p>Get in touch with our team.</p></div>} />
            <Route path="/sustainability" element={<div className="container mx-auto px-4 py-20"><h1>Sustainability</h1><p>Our commitment to ethical and sustainable fashion.</p></div>} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/stores" element={<StoresPage />} />
            
            {/* Account Routes */}
            <Route path="/account" element={<AccountLayout />}>
              <Route index element={<MyAccount />} />
              <Route path="orders" element={<OrderHistory />} />
              <Route path="addresses" element={<AddressBook />} />
              <Route path="payments" element={<PaymentMethods />} />
              <Route path="tracking" element={<OrderTracking />} />
              <Route path="returns" element={<ReturnsExchanges />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="loyalty" element={<LoyaltyProgram />} />
              <Route path="settings" element={<AccountSettings />} />
            </Route>
          </Routes>
        </main>
        <Footer />
        <StickyCartBar />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <CurrencyProvider>
      <LanguageProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </LanguageProvider>
    </CurrencyProvider>
  );
}