import { useState } from "react";

import { useCart } from "../../context/CartContext";
import type { ProductDetail } from "@/types";

import styles from "./ProductActions.module.css";

interface ProductActionsProps {
  product: ProductDetail;
}

export const ProductActions = ({ product }: ProductActionsProps) => {
  const { options, id } = product;
  const { addToCart } = useCart();

  const colorOptions = options?.colors ?? [];
  const storageOptions = options?.storages ?? [];

  const [selectedColorCode, setSelectedColorCode] = useState<number | null>(
    colorOptions[0]?.code ?? null
  );
  const [selectedStorageCode, setSelectedStorageCode] = useState<number | null>(
    storageOptions[0]?.code ?? null
  );
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    if (selectedColorCode === null || selectedStorageCode === null) return;

    try {
      setIsAdding(true);
      setError(null);
      await addToCart({
        id,
        colorCode: selectedColorCode,
        storageCode: selectedStorageCode,
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
    isAdding || added || selectedColorCode === null || selectedStorageCode === null || !product.price;

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
            value={selectedColorCode ?? undefined}
            onChange={(e) => setSelectedColorCode(Number(e.target.value))}
          >
            {colorOptions.map((color) => (
              <option key={`color_${color.code}`} value={color.code}>
                {color.name}
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
            value={selectedStorageCode ?? undefined}
            onChange={(e) => setSelectedStorageCode(Number(e.target.value))}
          >
            {storageOptions.map((storage) => (
              <option key={`storage_${storage.code}`} value={storage.code}>
                {storage.name}
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
