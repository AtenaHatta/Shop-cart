import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CartIcon } from "../components/CartIcon";
import { useCart } from "../context/CartContext";

export function SuccessPage() {
  const { clearCart, itemCount } = useCart();
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const reference = sessionId ? sessionId.slice(-10).toUpperCase() : null;

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="layout">
      <header className="header">
        <h1>
          <Link to="/" className="brand">
            GWC
          </Link>
        </h1>
        <CartIcon count={itemCount} />
      </header>

      <main className="main success-main">
        <section className="success-card">
          <span className="success-card__icon" aria-hidden>
            <CheckIcon />
          </span>
          <h2 className="success-card__title">Payment successful</h2>
          <p className="success-card__text">
            Thank you. Your order is confirmed and a receipt will be sent to
            the email used at checkout.
          </p>
          {reference ? (
            <p className="success-card__ref">
              Order reference
              <strong>{reference}</strong>
            </p>
          ) : null}
          <p className="success-card__meta">
            Shipping is free. Items typically leave the boutique within 1–2
            business days.
          </p>
          <Link className="btn checkout-btn" to="/">
            Continue shopping
          </Link>
        </section>
      </main>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width={28} height={28}>
      <path
        fill="currentColor"
        d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"
      />
    </svg>
  );
}
