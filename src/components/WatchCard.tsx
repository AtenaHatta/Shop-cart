import type { Product } from "../type";
import { formatPrice } from "../formatPrice";

type Props = {
  product: Product;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export function WatchCard({
  product,
  quantity,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <article className="watch-card">
      <img
        className="watch-card__thumb"
        src={product.image}
        alt={product.name}
        width={140}
        height={140}
        loading="lazy"
      />
      <div className="watch-card__body">
        <div className="watch-card__details">
          <h3 className="watch-card__title">{product.name}</h3>
          <p className="watch-card__subtitle">{product.subtitle}</p>
          <p className="watch-card__meta in-stock">
            <StockIcon />
            In stock
          </p>
          <p className="watch-card__meta">
            <ReturnIcon />
            Free returns within 30 days
          </p>
        </div>
        <div className="watch-card__footer">
          <span className="watch-card__price">{formatPrice(product.priceCents)}</span>
          <div className="qty-control">
            <button
              type="button"
              className="qty-control__btn"
              aria-label={`Decrease ${product.name} quantity`}
              disabled={quantity <= 0}
              onClick={onDecrease}
            >
              −
            </button>
            <span className="qty-control__value">{quantity}</span>
            <button
              type="button"
              className="qty-control__btn"
              aria-label={`Increase ${product.name} quantity`}
              onClick={onIncrease}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function StockIcon() {
  return (
    <svg
      className="watch-card__meta-icon"
      viewBox="0 0 24 24"
      width={16}
      height={16}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
      />
    </svg>
  );
}

function ReturnIcon() {
  return (
    <svg
      className="watch-card__meta-icon"
      viewBox="0 0 24 24"
      width={16}
      height={16}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 13c0-4.42-3.58-8-8-8m0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 14.74A7.93 7.93 0 0 0 4 13c0 4.42 3.58 8 8 8v3l5-5-5-5z"
      />
    </svg>
  );
}
