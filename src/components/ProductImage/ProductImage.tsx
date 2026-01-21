import styles from "./ProductImage.module.css";

interface ProductImageProps {
  imgUrl: string;
  brand: string;
  model: string;
}

export const ProductImage = ({ imgUrl, brand, model }: ProductImageProps) => {
  return (
    <div className={styles.imageContainer}>
      <img src={imgUrl} alt={`${brand} ${model}`} className={styles.image} />
    </div>
  );
};
