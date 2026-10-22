import { Link, useSearchParams } from "react-router-dom";
import { CardWrapper } from "./components/CardWrapper";
import { CartIcon } from "./components/CartIcon";
import { CheckoutSidebar } from "./components/CheckoutSidebar";
import { useCart } from "./context/CartContext";

function App() {
  const { itemCount } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const checkoutCanceled = searchParams.get("checkout") === "canceled";

  function dismissCanceled() {
    searchParams.delete("checkout");
    setSearchParams(searchParams, { replace: true });
  }

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

      <main className="main">
        {checkoutCanceled ? (
          <p className="notice">
            Checkout was canceled.{" "}
            <button type="button" onClick={dismissCanceled}>
              Dismiss
            </button>
          </p>
        ) : null}

        <div className="shop-layout">
          <CardWrapper />
          <CheckoutSidebar />
        </div>
      </main>
    </div>
  );
}

export default App;
