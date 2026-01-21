import { Link } from "react-router-dom";

import type { Product } from "@/types";

import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { id, brand, model, price, imgUrl } = product;

  return (
    <Link to={`/product/${id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={imgUrl}
          alt={`${brand} ${model}`}
          className={styles.image}
          loading="lazy"
        />
      </div>
      <div className={styles.info}>
        <span className={styles.brand}>{brand}</span>
        <h3 className={styles.model}>{model}</h3>
        <span className={styles.price}>{price} €</span>
      </div>
    </Link>
  );
};
