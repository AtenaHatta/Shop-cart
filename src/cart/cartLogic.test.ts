import { describe, expect, it } from "vitest";
import type { CartItem, Product } from "../type";
import {
  addToCart,
  cartItemCount,
  cartTotal,
  gstHst,
  removeFromCart,
  setCartItemQuantity,
} from "./cartLogic";

const watchA: Product = {
  id: "1",
  name: "Watch 1",
  subtitle: "Steel / Black dial",
  priceCents: 12_850_000,
  image: "/watches/submariner.webp",
};

const watchB: Product = {
  id: "2",
  name: "Diver",
  subtitle: "Steel / Blue bezel",
  priceCents: 18_600_000,
  image: "/watches/black-bay.webp",
};

function asCartItem(product: Product, quantity: number): CartItem {
  return { ...product, quantity };
}

describe("addToCart", () => {
  it("adds a new line for a new product", () => {
    const next = addToCart([], watchA);
    expect(next).toEqual([asCartItem(watchA, 1)]);
  });

  it("increments quantity instead of adding a duplicate row", () => {
    const once = addToCart([], watchA);
    const twice = addToCart(once, watchA);

    expect(twice).toHaveLength(1);
    expect(twice[0].quantity).toBe(2);
  });

  it("keeps separate lines for different products", () => {
    const withA = addToCart([], watchA);
    const withBoth = addToCart(withA, watchB);

    expect(withBoth).toHaveLength(2);
    expect(withBoth.map((item) => item.id)).toEqual(["1", "2"]);
  });
});

describe("removeFromCart", () => {
  it("removes the matching product line", () => {
    const items = [asCartItem(watchA, 2), asCartItem(watchB, 1)];
    const next = removeFromCart(items, "1");

    expect(next).toEqual([asCartItem(watchB, 1)]);
  });
});

describe("setCartItemQuantity", () => {
  it("updates quantity for an existing line", () => {
    const items = [asCartItem(watchA, 1)];
    const next = setCartItemQuantity(items, "1", 3);

    expect(next).toEqual([asCartItem(watchA, 3)]);
  });

  it("removes the line when quantity is 0", () => {
    const items = [asCartItem(watchA, 2)];
    const next = setCartItemQuantity(items, "1", 0);

    expect(next).toEqual([]);
  });

  it("removes the line when quantity is negative", () => {
    const items = [asCartItem(watchA, 2)];
    const next = setCartItemQuantity(items, "1", -1);

    expect(next).toEqual([]);
  });

  it("leaves cart unchanged for unknown product id", () => {
    const items = [asCartItem(watchA, 1)];
    const next = setCartItemQuantity(items, "missing", 5);

    expect(next).toBe(items);
  });
});

describe("cartTotal", () => {
  it("sums price × quantity for all lines", () => {
    const items = [asCartItem(watchA, 2), asCartItem(watchB, 1)];
    expect(cartTotal(items)).toBe(12_850_000 * 2 + 18_600_000);
  });

  it("returns 0 for an empty cart", () => {
    expect(cartTotal([])).toBe(0);
  });
});

describe("cartItemCount", () => {
  it("sums quantities across lines", () => {
    const items = [asCartItem(watchA, 2), asCartItem(watchB, 3)];
    expect(cartItemCount(items)).toBe(5);
  });
});

describe("gstHst", () => {
  it("applies 13% in integer cents", () => {
    expect(gstHst(12_850_000)).toBe(1_670_500);
  });

  it("returns 0 for an empty subtotal", () => {
    expect(gstHst(0)).toBe(0);
  });
});
