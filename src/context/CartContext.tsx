import {
  createContext,
  useState,
  useContext,
  useCallback,
  type ReactNode,
} from "react";

import type { AddToCartPayload, AddToCartResponse } from "@/types";
import { addToCart as apiAddToCart, getCartCount } from "../services/api";

interface CartContextType {
  cartCount: number;
  addToCart: (payload: AddToCartPayload) => Promise<AddToCartResponse>;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartCount, setCartCount] = useState<number>(() => getCartCount());

  const addToCart = useCallback(
    async (payload: AddToCartPayload): Promise<AddToCartResponse> => {
      const response = await apiAddToCart(payload);
      setCartCount(response.count);
      return response;
    },
    [],
  );

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
};
