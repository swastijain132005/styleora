import React, { useState } from "react";
import styles from "./step4.module.css";

export default function Step4Modal({ data, onSave, onClose }) {
  const [budget, setBudget] = useState(data.budget || "");

  const budgetOptions = [
    "< ₹1000",
    "₹1000 - ₹3000",
    "₹3000 - ₹5000",
    "₹5000 - ₹10000",
    "> ₹10000"
  ];

  const handleSave = () => {
    if (!budget) {
      alert("Please select your budget.");
      return;
    }
    onSave({ budget });
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h3>Select your budget</h3>

        <div className={styles.optionContainer}>
          {budgetOptions.map((option) => (
            <div
              key={option}
              className={`${styles.optionCard} ${budget === option ? styles.active : ""}`}
              onClick={() => setBudget(option)}
            >
              {option}
            </div>
          ))}
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleSave}>
            Save
          </button>
          <button className={styles.buttonSkip} onClick={onClose}>
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
