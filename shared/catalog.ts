export type CatalogProduct = {
  id: string;
  name: string;
  subtitle: string;
  priceCents: number;
  image: string;
};

export const catalog: CatalogProduct[] = [
  {
    id: "1",
    name: "Skyler",
    subtitle: "Steel / Black dial",
    priceCents: 12_850_000,
    image: "/watches/submariner.webp",
  },
  {
    id: "2",
    name: "Diver",
    subtitle: "Steel / Blue bezel",
    priceCents: 18_600_000,
    image: "/watches/black-bay.webp",
  },
  {
    id: "3",
    name: "Classic",
    subtitle: "Steel / Silver dial",
    priceCents: 9_720_000,
    image: "/watches/datejust.webp",
  },
  {
    id: "4",
    name: "Chronograph",
    subtitle: "Steel / Black dial",
    priceCents: 7_640_000,
    image: "/watches/speedmaster.webp",
  },
  {
    id: "5",
    name: "Dress",
    subtitle: "Steel / Silver dial",
    priceCents: 6_180_000,
    image: "/watches/tank.webp",
  },
];

export function getCatalogProduct(id: string) {
  return catalog.find((product) => product.id === id);
}
