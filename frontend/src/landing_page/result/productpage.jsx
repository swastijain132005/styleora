import styles from "./product.module.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { addwishlist } from "../../api/wishlist";
import { checkWishlist } from "../../api/wishlist";
import { getWishlist, removewishlist } from "../../api/wishlist";

export default function ProductPage() {
  const location = useLocation();

  let products = location.state?.products || [];
  const [wishlistStatus, setWishlistStatus] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {

  const checkProducts = async () => {

    const status = {};

    for (const product of products) {

      try {

        const res = await checkWishlist(product._id);

        status[product._id] = res.data.exists;

      } catch (err) {

        status[product._id] = false;

      }

    }

    setWishlistStatus(status);

  };

  if (products.length) {
    checkProducts();
  }

}, []);
  
  if (!products.length) {
    return <p>No products found</p>;
  }

  const handleWishlist = async (productId) => {

  try {

    if (wishlistStatus[productId]) {

      await removeWishlist(productId);

      toast.success("Removed from wishlist");

      setWishlistStatus((prev) => ({
        ...prev,
        [productId]: false
      }));

    } else {

      await addwishlist(productId);

      toast.success("Added to wishlist");

      setWishlistStatus((prev) => ({
        ...prev,
        [productId]: true
      }));

    }

  } catch (err) {

    toast.error(err.response?.data?.message || "Something went wrong");

  }

};

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
          <button
  onClick={() => handleWishlist(product._id)}
>
  {wishlistStatus[product._id] ? "❤️ Remove" : "🤍 Add"}
</button>

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