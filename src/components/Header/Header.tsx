import { Link, useLocation } from "react-router-dom";

import { useCart } from "../../context/CartContext";

import styles from "./Header.module.css";

interface Breadcrumb {
  label: string;
  path: string;
}

export const Header = () => {
  const { cartCount } = useCart();
  const location = useLocation();

  const getBreadcrumbs = (): Breadcrumb[] => {
    const paths = location.pathname.split("/").filter(Boolean);

    if (paths.length === 0) {
      return [{ label: "Home", path: "/" }];
    }

    const breadcrumbs: Breadcrumb[] = [{ label: "Home", path: "/" }];

    if (paths[0] === "product" && paths[1]) {
      breadcrumbs.push({ label: "Product", path: location.pathname });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className={styles.container}>
      <Link to="/" className={styles.logo}>
        <span className={styles.logoText}>Mobile Store</span>
      </Link>

      <nav className={styles.breadcrumbs} aria-label="Navigation Breadcrumbs">
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb.path}>
            {index > 0 && <span className={styles.separator}>/</span>}
            {index === breadcrumbs.length - 1 ? (
              <span className={styles.currentPage}>{crumb.label}</span>
            ) : (
              <Link to={crumb.path} className={styles.breadcrumbLink}>
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>

      <div className={styles.cart}>
        <span className={styles.cartIcon}>🛒</span>
        <span className={styles.cartCount}>{cartCount || 0}</span>
      </div>
    </header>
  );
};
