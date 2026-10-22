import { useState } from "react";
import { useCart } from "../context/CartContext";

type Props = {
  label?: string;
  disabled?: boolean;
};

export function CheckoutButton({
  label = "Pay with Stripe",
  disabled = false,
}: Props) {
  const { items } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Checkout failed");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setLoading(false);
    }
  }

  return (
    <div className="checkout">
      <button
        type="button"
        className="btn checkout-btn"
        disabled={loading || disabled}
        onClick={handleCheckout}
      >
        {loading ? "Redirecting…" : label}
      </button>
      {error ? <p className="error">{error}</p> : null}
    </div>
  );
}
