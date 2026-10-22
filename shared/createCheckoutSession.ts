import Stripe from "stripe";
import { getCatalogProduct } from "./catalog.js";
import { gstHst } from "./gstHst.js";

export type CheckoutItemInput = {
  id: string;
  quantity: number;
};

export async function createCheckoutSession(
  secretKey: string,
  items: CheckoutItemInput[],
  origin: string,
) {
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  if (!items.length) {
    throw new Error("Cart is empty");
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  let subtotalCents = 0;

  for (const item of items) {
    const product = getCatalogProduct(item.id);
    if (!product) {
      throw new Error(`Unknown product: ${item.id}`);
    }
    if (!Number.isInteger(item.quantity) || item.quantity < 1) {
      throw new Error(`Invalid quantity for product: ${item.id}`);
    }

    subtotalCents += product.priceCents * item.quantity;
    lineItems.push({
      quantity: item.quantity,
      price_data: {
        currency: "cad",
        unit_amount: product.priceCents,
        product_data: {
          name: product.name,
          images: product.image.startsWith("http") ? [product.image] : undefined,
        },
      },
    });
  }

  if (!lineItems.length) {
    throw new Error("Cart is empty");
  }

  const taxCents = gstHst(subtotalCents);
  if (taxCents > 0) {
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: "cad",
        unit_amount: taxCents,
        product_data: {
          name: "GST/HST (13%)",
        },
      },
    });
  }

  const stripe = new Stripe(secretKey);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/?checkout=canceled`,
  });

  if (!session.url) {
    throw new Error("Could not create checkout session");
  }

  return { url: session.url };
}
