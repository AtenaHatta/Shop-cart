export type Product = {
  id: string;
  name: string;
  subtitle: string;
  priceCents: number;
  image: string;
};

export type CartItem = Product & {
  quantity: number;
};
