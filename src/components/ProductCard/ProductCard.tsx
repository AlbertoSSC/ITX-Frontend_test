import { Link } from "react-router-dom";

import { ProductImage } from "../ProductImage/ProductImage";

import type { Product } from "@/types";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { id, brand, model, price, imgUrl } = product;

  return (
    <article className={styles.card}>
      <Link
        to={`/product/${id}`}
        className={styles.cardLink}
        aria-label={`View ${brand} ${model} - ${price ? `${price} euros` : "Price unavailable"
          }`}
      >
        <ProductImage
          imgUrl={imgUrl}
          brand={brand}
          model={model}
          containerClassName={styles.imageContainer}
          imageClassName={styles.image}
          lazy
        />
        <div className={styles.info}>
          <span className={styles.brand}>{brand}</span>
          <h3 className={styles.model}>{model}</h3>
          <span className={styles.price}>{price ? `${price} €` : "Price unavailable"}</span>
        </div>
      </Link>
    </article >
  );
};
