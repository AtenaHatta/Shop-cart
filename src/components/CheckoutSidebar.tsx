import { Link } from "react-router-dom";
import { gstHst } from "../cart/cartLogic";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../formatPrice";
import { CheckoutButton } from "./CheckoutButton";

export function CheckoutSidebar() {
  const { total, itemCount } = useCart();

  const hasItems = itemCount > 0;
  const shippingLabel = hasItems ? "Free" : "—";
  const tax = gstHst(total);
  const grandTotal = total + tax;

  return (
    <aside className="checkout-sidebar">
      <section className="order-summary">
        <h3>Order Summary</h3>

        <dl>
          <div>
            <dt>Subtotal ({itemCount} items)</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
          <div>
            <dt>Shipping</dt>
            <dd className={hasItems ? "free" : undefined}>
              {shippingLabel}
            </dd>
          </div>
          <div>
            <dt>GST/HST</dt>
            <dd>{formatPrice(tax)}</dd>
          </div>
          <div className="total-row">
            <dt>Total</dt>
            <dd>{formatPrice(grandTotal)}</dd>
          </div>
        </dl>

        <CheckoutButton
          disabled={!hasItems}
          label="Continue to checkout"
        />
        <Link to="/" className="btn checkout-secondary">
          Continue Shopping
        </Link>
      </section>
    </aside>
  );
}
