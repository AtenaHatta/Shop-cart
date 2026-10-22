import { createContext, useContext, useState, type ReactNode } from "react";
import {
  addToCart,
  cartItemCount,
  cartTotal,
  removeFromCart,
  setCartItemQuantity,
} from "../cart/cartLogic";
import type { CartItem, Product } from "../type";

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  setItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addItem(product: Product) {
    setItems((prev) => addToCart(prev, product));
  }

  function removeItem(productId: string) {
    setItems((prev) => removeFromCart(prev, productId));
  }

  function setItemQuantity(productId: string, quantity: number) {
    setItems((prev) => setCartItemQuantity(prev, productId, quantity));
  }

  function clearCart() {
    setItems([]);
  }

  const total = cartTotal(items);
  const itemCount = cartItemCount(items);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        setItemQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error("CartProvider is missing");
  }
  return cart;
}
