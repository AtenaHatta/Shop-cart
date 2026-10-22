import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  createCheckoutSession,
  type CheckoutItemInput,
} from "../shared/createCheckoutSession.js";

function getOrigin(req: VercelRequest) {
  const configured = process.env.APP_URL?.replace(/\/$/, "");
  if (configured) return configured;

  const host = req.headers["x-forwarded-host"] ?? req.headers.host;
  const proto = req.headers["x-forwarded-proto"] ?? "https";
  if (typeof host === "string") {
    return `${proto}://${host}`;
  }

  return "http://localhost:5173";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body as { items?: CheckoutItemInput[] };
    const items = body?.items ?? [];
    const secretKey = process.env.STRIPE_SECRET_KEY ?? "";
    const { url } = await createCheckoutSession(
      secretKey,
      items,
      getOrigin(req),
    );
    return res.status(200).json({ url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Checkout failed";
    return res.status(400).json({ error: message });
  }
}
