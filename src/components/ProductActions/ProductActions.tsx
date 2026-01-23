import { useState, useEffect } from "react";

import { useCart } from "../../context/CartContext";
import type { ProductDetail } from "@/types";

import styles from "./ProductActions.module.css";

interface ProductActionsProps {
  product: ProductDetail;
}

export const ProductActions = ({ product }: ProductActionsProps) => {
  const { colors = [], internalMemory = [], id } = product;
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState<string | "">("");
  const [selectedStorage, setSelectedStorage] = useState<string | "">("");
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (colors.length > 0 && selectedColor === "") {
      setSelectedColor(colors[0]);
    }
  }, [colors, selectedColor]);

  useEffect(() => {
    if (internalMemory.length > 0 && selectedStorage === "") {
      setSelectedStorage(internalMemory[0]);
    }
  }, [internalMemory, selectedStorage]);

  const handleAddToCart = async () => {
    if (selectedColor === "" || selectedStorage === "") return;

    try {
      setIsAdding(true);
      setError(null);
      await addToCart({
        id,
        colorCode: selectedColor,
        storageCode: selectedStorage,
      });
      setAdded(true);
    } catch (err) {
      setError("Error adding products to cart");
      console.error(err);
    } finally {
      setIsAdding(false);
    }
  };

  const isDisabled =
    isAdding || added || selectedColor === "" || selectedStorage === "";

  return (
    <section className={styles.actions} aria-labelledby="options-title">
      <h2 id="options-title" className={styles.title}>
        Options
      </h2>

      <fieldset className={styles.fieldset}>
        <legend className="visually-hidden">Product configuration</legend>

        <div className={styles.selectorGroup}>
          <label htmlFor="color-select" className={styles.label}>
            Color
          </label>
          <select
            id="color-select"
            className={styles.select}
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            {colors.map((color, index) => (
              <option key={`color_${color}_${index}`} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.selectorGroup}>
          <label htmlFor="storage-select" className={styles.label}>
            Storage
          </label>
          <select
            id="storage-select"
            className={styles.select}
            value={selectedStorage}
            onChange={(e) => setSelectedStorage(e.target.value)}
          >
            {internalMemory.map((storage, index) => (
              <option key={`internalMemory_${storage}_${index}`} value={storage}>
                {storage}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <button
        type="button"
        className={`${styles.addButton} ${added ? styles.added : ""}`}
        onClick={handleAddToCart}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-describedby={error ? "cart-error" : undefined}
      >
        {isAdding ? "Adding..." : added ? "Added to cart" : "Add to cart"}
      </button>

      {error && (
        <p id="cart-error" className={styles.error} role="alert" aria-live="assertive">
          {error}
        </p>
      )}
    </section>
  );
};

