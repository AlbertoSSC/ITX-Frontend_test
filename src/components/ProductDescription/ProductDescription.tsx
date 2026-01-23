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
    <section className={styles.description} aria-labelledby="specs-title">
      <h2 id="specs-title" className={styles.title}>
        Specifications
      </h2>
      <dl className={styles.specsList}>
        {specs.map((spec) => (
          <div key={spec.label} className={styles.specItem}>
            <dt className={styles.specLabel}>{spec.label}</dt>
            <dd className={styles.specValue}>{spec.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

