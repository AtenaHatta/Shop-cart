type Props = {
  count: number;
};

export function CartIcon({ count }: Props) {
  return (
    <div
      className="cart-icon"
      aria-label={count > 0 ? `Cart, ${count} items` : "Cart"}
    >
      <svg
        className="cart-icon__svg"
        viewBox="0 0 24 24"
        width={24}
        height={24}
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM7.16 14h9.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 21.05 5H6.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7.42l-.26-.46z"
        />
      </svg>
      {count > 0 ? (
        <span className="cart-icon__badge">{count}</span>
      ) : null}
    </div>
  );
}
