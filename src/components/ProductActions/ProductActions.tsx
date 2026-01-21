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

  return (
    <div className={styles.actions}>
      <h2 className={styles.title}>Options</h2>

      <div className={styles.selectorGroup}>
        <label className={styles.label}>Color</label>
        <select
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
        <label className={styles.label}>Storage</label>
        <select
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

      <button
        className={`${styles.addButton} ${added ? styles.added : ""}`}
        onClick={handleAddToCart}
        disabled={isAdding || added || selectedColor === "" || selectedStorage === ""}
      >
        {isAdding ? "Adding..." : added ? "Added" : "Add to cart"}
      </button>
      {error && (
        <p className={styles.error}>An error occurred: {error}</p>
      )}
    </div>
  );
};
