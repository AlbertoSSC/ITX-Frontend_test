import { useState, useRef } from "react";

import styles from "./ProductImage.module.css";

const PLACEHOLDER_IMAGE = "/placeholder.svg";

interface ProductImageProps {
  imgUrl: string;
  brand: string;
  model: string;
  containerClassName?: string;
  imageClassName?: string;
  lazy?: boolean;
}

export const ProductImage = ({
  imgUrl,
  brand,
  model,
  containerClassName,
  imageClassName,
  lazy = false,
}: ProductImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div
      className={`${containerClassName ?? styles.imageContainer}`}
    >
      {isLoading && (
        <img src={PLACEHOLDER_IMAGE} alt="placeholder" aria-hidden="true" />
      )}

      <img
        ref={imgRef}
        src={hasError ? PLACEHOLDER_IMAGE : imgUrl}
        alt={`${brand} ${model}`}
        className={imageClassName ?? styles.image}
        loading={lazy ? "lazy" : undefined}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      />
    </div>
  );
};
