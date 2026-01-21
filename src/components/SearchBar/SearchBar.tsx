import styles from "./SearchBar.module.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className={styles.searchContainer}>
      <span className={styles.searchIcon}>🔍</span>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search by brand or model..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search products"
      />
      {value && (
        <button
          className={styles.clearButton}
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};
