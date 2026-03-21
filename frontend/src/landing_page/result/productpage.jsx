import styles from "./product.module.css";

export default function ProductPage({product}) {
  return (
    <div className={styles.card}>
        <img src={product.imageUrl} alt={product.name} className={styles.image} />
      <h3>{product.name}</h3>
      <p className={styles.brand }>{product.brand}</p>
      <p className={styles.price}>${product.price.toFixed(2)}</p>

      <div className={styles.colors}> {
        product.colors?.map((color, index) => (
          <span key={index} className={styles.colorTag}>{color}</span>
        ))
      } </div>

      <p className={styles.reason}>{product.reason}</p>
    </div>
  );
}