import { catalog } from "../../shared/catalog.ts";
import { Card } from "./Card";

export function CardWrapper() {
  return (
    <section>
      <ul className="grid">
        {catalog.map((product) => (
          <li key={product.id}>
            <Card product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
