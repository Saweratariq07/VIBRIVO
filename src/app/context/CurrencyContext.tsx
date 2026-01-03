import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  convertPrice: (priceInEUR: number) => string;
  currencySymbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Exchange rates (base: EUR)
const exchangeRates = {
  EUR: 1,
  GBP: 0.86,
  USD: 1.09,
  CAD: 1.47,
};

const currencySymbols = {
  EUR: '€',
  GBP: '£',
  USD: '$',
  CAD: 'CA$',
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  // Initialize with USD for USA market
  const [currency, setCurrencyState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedCurrency = localStorage.getItem('selectedCurrency');
      return savedCurrency || 'USD';
    }
    return 'USD';
  });

  // Save to localStorage when currency changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedCurrency', currency);
    }
  }, [currency]);

  const setCurrency = (newCurrency: string) => {
    setCurrencyState(newCurrency);
  };

  const convertPrice = (priceInEUR: number): string => {
    const rate = exchangeRates[currency as keyof typeof exchangeRates] || 1;
    const convertedPrice = priceInEUR * rate;
    const symbol = currencySymbols[currency as keyof typeof currencySymbols] || '€';
    
    return `${symbol}${Math.round(convertedPrice)}`;
  };

  const currencySymbol = currencySymbols[currency as keyof typeof currencySymbols] || '€';

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, currencySymbol }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
