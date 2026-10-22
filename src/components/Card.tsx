import type { Product } from "../type";
import { useCart } from "../context/CartContext";
import { WatchCard } from "./WatchCard";

type Props = {
  product: Product;
};

export function Card({ product }: Props) {
  const { items, addItem, setItemQuantity } = useCart();
  const quantity = items.find((item) => item.id === product.id)?.quantity ?? 0;

  return (
    <WatchCard
      product={product}
      quantity={quantity}
      onIncrease={() =>
        quantity === 0
          ? addItem(product)
          : setItemQuantity(product.id, quantity + 1)
      }
      onDecrease={() => setItemQuantity(product.id, quantity - 1)}
    />
  );
}
