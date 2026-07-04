import React, { useState, useEffect } from "react";
import styles from "./wishlist.module.css";

import {getWishlist} from "../../api/wishlist";
import {removewishlist} from "../../api/wishlist";
import {toast} from "react-hot-toast";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const res = await removewishlist(productId);
      if (res.status === 200) {
        setWishlist(wishlist.filter((item) => item.product._id !== productId));
        toast.success("Product removed from wishlist");
      } else {
        toast.error("Error removing product from wishlist");
      }
    } catch (err) {
      setError(err.message);
      toast.error("Error removing product from wishlist");
    }
  };



  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await getWishlist();
        setWishlist(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  if (wishlist.length === 0) {
  return (
    <div className={styles.wishlist}>
      <h2>Wishlist</h2>
      <p>Your wishlist is empty ❤️</p>
    </div>
  );
}

  return (
    <div className={styles.wishlist}>
      <h2>Wishlist</h2>
      <div className={styles.wishlistItems}>
        {wishlist.map((item) => (
          <div key={item._id} className={styles.wishlistItem}>
            <img src={item.product.imageUrl} alt={item.product.name} className={styles.image} />
            <div className={styles.details}>
              <h3>{item.product.name}</h3>
              <p className={styles.brand}>{item.product.brand}</p>
              <p className={styles.price}>₹{item.product.price}</p>
              <button
                className={styles.removeButton}
                onClick={() => handleRemoveFromWishlist(item.product._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}