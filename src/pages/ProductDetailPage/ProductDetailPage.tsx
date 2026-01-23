import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import type { ProductDetail } from "@/types";
import { getProductById } from "../../services/api";

import {
  ProductImage,
  ProductDescription,
  ProductActions,
  Spinner,
} from "@/components";

import styles from "./ProductDetailPage.module.css";

export const ProductDetailPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Error loading product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading} role="status" aria-live="polite">
          <Spinner />
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.container}>
        <div className={styles.error} role="alert">
          <p>{error || "Product not found"}</p>
          <Link to="/" className={styles.backLink}>
            Back to catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className={styles.container}>
      <nav aria-label="Back navigation">
        <Link to="/" className={styles.backLink}>
          <span aria-hidden="true">←</span> Back to catalog
        </Link>
      </nav>

      <header className={styles.productHeader}>
        <h1 className={styles.productTitle}>
          {product.brand} {product.model}
        </h1>
        <p
          className={styles.productPrice}
          aria-label={`Price: ${product.price} euros`}
        >
          {product.price} €
        </p>
      </header>

      <div className={styles.content}>
        <section className={styles.imageColumn} aria-label="Product image">
          <ProductImage
            imgUrl={product.imgUrl}
            brand={product.brand}
            model={product.model}
          />
        </section>

        <div className={styles.detailsColumn}>
          <ProductDescription product={product} />
          <ProductActions product={product} />
        </div>
      </div>
    </article>
  );
};

