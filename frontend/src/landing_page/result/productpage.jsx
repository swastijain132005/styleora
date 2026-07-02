import styles from "./product.module.css";
import { useLocation } from "react-router-dom";

export default function ProductPage() {
  const location = useLocation();

  let products = location.state?.products || [];

  
  if (!products.length) {
    return <p>No products found</p>;
  }

  return (
  <div className={styles.grid}>
    {products.map((product) => (
      <div key={product._id} className={styles.card}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className={styles.image}
        />

        <div className={styles.cardContent}>
          <h3>{product.name}</h3>
          <p className={styles.brand}>{product.brand}</p>
          <p className={styles.price}>₹{product.price}</p>

          <div className={styles.colors}>
            {product.colors?.map((color, index) => (
              <span key={index} className={styles.colorTag}>
                {color}
              </span>
            ))}
          </div>

          <p className={styles.reason}>{product.reason}</p>
        </div>
      </div>
    ))}
  </div>
);
}