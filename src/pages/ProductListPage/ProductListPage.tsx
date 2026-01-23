import { useState, useEffect, useMemo } from "react";

import type { Product } from "@/types";
import { getProducts } from "../../services/api";

import { SearchBar, ProductCard, Spinner } from "@/components";

import styles from "./ProductListPage.module.css";

export const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Error loading products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;

    const term = searchTerm.toLowerCase();
    return products.filter(
      (product) =>
        product.brand?.toLowerCase().includes(term) ||
        product.model?.toLowerCase().includes(term),
    );
  }, [products, searchTerm]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading} role="status" aria-live="polite">
          <Spinner />
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error} role="alert">
          <p>{error}</p>
          <button type="button" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className={styles.container} aria-labelledby="catalog-title">
      <header className={styles.header}>
        <h1 id="catalog-title" className={styles.title}>
          Mobile Catalog
        </h1>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </header>

      <p className={styles.resultCount} role="status" aria-live="polite">
        {filteredProducts.length === 0
          ? `No products found for "${searchTerm}"`
          : `Showing ${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""}`}
      </p>

      {filteredProducts.length > 0 && (
        <ul className={styles.grid} role="list" aria-label="Product catalog">
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

