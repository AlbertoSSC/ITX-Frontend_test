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
        <div className={styles.loading}>
          <Spinner />
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>{error || "Product not found"}</p>
          <Link to="/" className={styles.backLink}>
            Back to catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>
        ← Back to catalog
      </Link>

      <div className={styles.productHeader}>
        <h1 className={styles.productTitle}>
          {product.brand} {product.model}
        </h1>
        <span className={styles.productPrice}>{product.price} €</span>
      </div>

      <div className={styles.content}>
        <div className={styles.imageColumn}>
          <ProductImage
            imgUrl={product.imgUrl}
            brand={product.brand}
            model={product.model}
          />
        </div>

        <div className={styles.detailsColumn}>
          <ProductDescription product={product} />
          <ProductActions product={product} />
        </div>
      </div>
    </div>
  );
};
