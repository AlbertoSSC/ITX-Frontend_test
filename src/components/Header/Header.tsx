import { Link, useLocation } from "react-router-dom";

import { useCart } from "../../context/CartContext";

import styles from "./Header.module.css";



import { buildBreadcrumbs } from "../Breadcrumbs/breadcrumbs";

export const Header = () => {
  const { cartCount } = useCart();
  const location = useLocation();

  const breadcrumbs = buildBreadcrumbs(location.pathname);

  return (
    <header className={styles.container}>
      <Link to="/" className={styles.logo}>
        <span className={styles.logoText}>Mobile Store</span>
      </Link>

      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <ol className={styles.breadcrumbList}>
          {breadcrumbs.map((crumb, index) => {
            const isCurrentPage = index === breadcrumbs.length - 1;
            return (
              <li key={crumb.path} className={styles.breadcrumbItem}>
                {index > 0 && (
                  <span className={styles.separator} aria-hidden="true">
                    /
                  </span>
                )}
                {isCurrentPage ? (
                  <span className={styles.currentPage} aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link to={crumb.path} className={styles.breadcrumbLink}>
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <div
        className={styles.cart}
        role="status"
        aria-label={`Shopping cart: ${cartCount || 0} items`}
      >
        <span className={styles.cartIcon} aria-hidden="true">
          🛒
        </span>
        <span className={styles.cartCount}>{cartCount || 0}</span>
      </div>
    </header>
  );
};

