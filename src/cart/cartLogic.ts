import type { CartItem, Product } from "../type";
import { GST_HST_RATE, gstHst } from "../../shared/gstHst.ts";

export { GST_HST_RATE, gstHst };

export function addToCart(items: CartItem[], product: Product): CartItem[] {
  const existing = items.find((item) => item.id === product.id);
  if (!existing) {
    return [...items, { ...product, quantity: 1 }];
  }
  return items.map((item) =>
    item.id === product.id
      ? { ...item, quantity: item.quantity + 1 }
      : item,
  );
}

export function removeFromCart(
  items: CartItem[],
  productId: string,
): CartItem[] {
  return items.filter((item) => item.id !== productId);
}

export function setCartItemQuantity(
  items: CartItem[],
  productId: string,
  quantity: number,
): CartItem[] {
  if (quantity <= 0) {
    return removeFromCart(items, productId);
  }
  const exists = items.some((item) => item.id === productId);
  if (!exists) {
    return items;
  }
  return items.map((item) =>
    item.id === productId ? { ...item, quantity } : item,
  );
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
}

export function cartItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
