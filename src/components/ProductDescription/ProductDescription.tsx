import type { ProductDetail } from "@/types";

import styles from "./ProductDescription.module.css";

interface ProductDescriptionProps {
  product: ProductDetail;
}

interface Spec {
  label: string;
  value: string | null;
}

export const ProductDescription = ({ product }: ProductDescriptionProps) => {
  const {
    brand,
    model,
    price,
    cpu,
    ram,
    os,
    displayResolution,
    battery,
    primaryCamera,
    secondaryCmera,
    dimentions,
    weight,
  } = product;

  const specs: Spec[] = [
    { label: "Brand", value: brand },
    { label: "Model", value: model },
    { label: "Price", value: `${price} €` },
    { label: "CPU", value: cpu },
    { label: "RAM", value: ram },
    { label: "Operating System", value: os },
    { label: "Display Resolution", value: displayResolution },
    { label: "Battery", value: battery },
    {
      label: "Primary Camera",
      value:
        (Array.isArray(primaryCamera)
          ? primaryCamera.join(", ")
          : primaryCamera) || null,
    },
    { label: "Secondary Camera", value: secondaryCmera },
    { label: "Dimensions", value: dimentions },
    { label: "Weight", value: weight ? `${weight} g` : null },
  ].filter((spec) => spec.value !== null);

  return (
    <div className={styles.description}>
      <h2 className={styles.title}>Specifications</h2>
      <ul className={styles.specsList}>
        {specs.map((spec) => (
          <li key={spec.label} className={styles.specItem}>
            <span className={styles.specLabel}>{spec.label}</span>
            <span className={styles.specValue}>{spec.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
