import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
  embroidery?: string;
  giftWrap?: boolean;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number, size?: string, color?: string) => void;
  updateQuantity: (id: number, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discountCode: string;
  setDiscountCode: (code: string) => void;
  discount: number;
  shipping: number;
  total: number;
  showCart: boolean;
  setShowCart: (show: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showCart, setShowCart] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('vibrivo-cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('vibrivo-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems(prevItems => {
      // Check if item with same id, size, and color exists
      const existingIndex = prevItems.findIndex(
        i => i.id === item.id && i.size === item.size && i.color === item.color
      );

      if (existingIndex !== -1) {
        // Update quantity
        const newItems = [...prevItems];
        newItems[existingIndex].quantity += item.quantity;
        return newItems;
      } else {
        // Add new item
        return [...prevItems, item];
      }
    });
  };

  const removeItem = (id: number, size?: string, color?: string) => {
    setItems(prevItems =>
      prevItems.filter(
        item => !(item.id === id && item.size === size && item.color === color)
      )
    );
  };

  const updateQuantity = (id: number, quantity: number, size?: string, color?: string) => {
    if (quantity <= 0) {
      removeItem(id, size, color);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // Apply discount code
  useEffect(() => {
    if (discountCode === 'VIBRIVO15') {
      setDiscount(0.15);
    } else if (discountCode === 'WELCOME10') {
      setDiscount(0.10);
    } else if (discountCode === 'SAVE20') {
      setDiscount(0.20);
    } else {
      setDiscount(0);
    }
  }, [discountCode]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 150 ? 0 : 10;
  const total = subtotal - (subtotal * discount) + shipping;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discountCode,
        setDiscountCode,
        discount,
        shipping,
        total,
        showCart,
        setShowCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
