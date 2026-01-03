import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<string, Record<string, string>> = {
  EN: {
    // Navigation
    'nav.home': 'Home',
    'nav.newArrivals': 'New Arrivals',
    'nav.bestSellers': 'Best Sellers',
    'nav.accessories': 'Accessories',
    'nav.trackOrder': 'Track Your Order',
    'nav.sustainability': 'Sustainability',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Product actions
    'product.addToCart': 'Add to Cart',
    'product.addToWishlist': 'Add to Wishlist',
    'product.quickView': 'Quick View',
    
    // Homepage
    'hero.title': 'Premium Comfort',
    'hero.subtitle': 'Discover Timeless Elegance',
    'hero.cta': 'Shop Now',
    'featured.title': 'Featured Products',
    'collection.viewAll': 'View All',
  },
  FR: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.newArrivals': 'Nouveautés',
    'nav.bestSellers': 'Meilleures Ventes',
    'nav.accessories': 'Accessoires',
    'nav.trackOrder': 'Suivre Votre Commande',
    'nav.sustainability': 'Durabilité',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',
    
    // Product actions
    'product.addToCart': 'Ajouter au Panier',
    'product.addToWishlist': 'Ajouter aux Favoris',
    'product.quickView': 'Aperçu Rapide',
    
    // Homepage
    'hero.title': 'Confort Premium',
    'hero.subtitle': 'Découvrez l\'Élégance Intemporelle',
    'hero.cta': 'Acheter Maintenant',
    'featured.title': 'Produits Vedettes',
    'collection.viewAll': 'Voir Tout',
  },
  DE: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.newArrivals': 'Neuankömmlinge',
    'nav.bestSellers': 'Bestseller',
    'nav.accessories': 'Accessoires',
    'nav.trackOrder': 'Bestellung Verfolgen',
    'nav.sustainability': 'Nachhaltigkeit',
    'nav.about': 'Über Uns',
    'nav.contact': 'Kontakt',
    
    // Product actions
    'product.addToCart': 'In den Warenkorb',
    'product.addToWishlist': 'Zur Wunschliste',
    'product.quickView': 'Schnellansicht',
    
    // Homepage
    'hero.title': 'Premium Komfort',
    'hero.subtitle': 'Entdecken Sie Zeitlose Eleganz',
    'hero.cta': 'Jetzt Einkaufen',
    'featured.title': 'Empfohlene Produkte',
    'collection.viewAll': 'Alle Anzeigen',
  },
  ES: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.newArrivals': 'Novedades',
    'nav.bestSellers': 'Más Vendidos',
    'nav.accessories': 'Accesorios',
    'nav.trackOrder': 'Rastrear Pedido',
    'nav.sustainability': 'Sostenibilidad',
    'nav.about': 'Acerca De',
    'nav.contact': 'Contacto',
    
    // Product actions
    'product.addToCart': 'Añadir al Carrito',
    'product.addToWishlist': 'Añadir a Favoritos',
    'product.quickView': 'Vista Rápida',
    
    // Homepage
    'hero.title': 'Comodidad Premium',
    'hero.subtitle': 'Descubre la Elegancia Atemporal',
    'hero.cta': 'Comprar Ahora',
    'featured.title': 'Productos Destacados',
    'collection.viewAll': 'Ver Todo',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<string>('EN');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (newLanguage: string) => {
    setLanguageState(newLanguage);
    localStorage.setItem('selectedLanguage', newLanguage);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.EN[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}