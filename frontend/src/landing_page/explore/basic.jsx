import React, { useState } from "react";
import styles from "./basic.module.css";

export default function Step1Modal({ data, onSave, onClose }) {
  const [selectedGender, setSelectedGender] = useState(data.gender || "");
  const [sliderValue, setSliderValue] = useState(data.age || 25);

  const handleSave = () => {
    if (!selectedGender) {
      alert("Please select a gender");
      return;
    }

    // ✅ send data to parent
    onSave({ gender: selectedGender, age: sliderValue });
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h3>Select shopping preference</h3>

        {/* Gender cards */}
        <div className={styles.genderContainer}>
          {["Women", "Men", "Unisex"].map((item) => (
            <div
              key={item}
              className={`${styles.genderCard} ${
                selectedGender === item ? styles.active : ""
              }`}
              onClick={() => setSelectedGender(item)}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Age slider */}
        <h3>Age: {sliderValue}</h3>
        <input
          type="range"
          min="12"
          max="80"
          value={sliderValue}
          className={styles.slider}
          onChange={(e) => setSliderValue(e.target.value)}
        />

        {/* Buttons */}
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
