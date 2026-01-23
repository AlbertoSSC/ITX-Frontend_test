import styles from "./SearchBar.module.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <search className={styles.searchContainer} role="search">
      <span className={styles.searchIcon} aria-hidden="true">
        🔍
      </span>
      <input
        type="search"
        className={styles.searchInput}
        placeholder="Search by brand or model..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search products by brand or model"
      />
      {value && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          <span aria-hidden="true">✕</span>
        </button>
      )}
    </search>
  );
};

