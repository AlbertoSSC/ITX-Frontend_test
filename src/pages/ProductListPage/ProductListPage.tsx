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
        <div className={styles.loading}>
          <Spinner />
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mobile Catalog</h1>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      {filteredProducts.length === 0 ? (
        <div className={styles.noResults}>
          <p>No products found for "{searchTerm}"</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
