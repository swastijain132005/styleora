import React, { useState } from "react";
import styles from "./step2.module.css";

export default function Step2Modal({ data, onSave, onClose }) {
  const [clothingTypes, setClothingTypes] = useState(data.clothingTypes || "");
  const [selectedSeasons, setSelectedSeasons] = useState(data.seasons || []);

  const seasonOptions = ["Spring", "Summer", "Autumn", "Winter"];

  const toggleSelection = (item) => {
    if (selectedSeasons.includes(item)) {
      setSelectedSeasons(selectedSeasons.filter((i) => i !== item));
    } else {
      setSelectedSeasons([...selectedSeasons, item]);
    }
  };

  const handleSave = () => {
    if (!clothingTypes.trim() || selectedSeasons.length === 0) {
      alert("Please enter your clothing types and select at least one season.");
      return;
    }

    onSave({
      clothingTypes,
      seasons: selectedSeasons,
    });
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h3>Which types of clothes do you prefer?</h3>
        <input
          type="text"
          value={clothingTypes}
          placeholder="E.g. T-shirts, Jeans, Jackets"
          className={styles.textInput}
          onChange={(e) => setClothingTypes(e.target.value)}
        />

        <h3>Select preferred season(s)</h3>
        <div className={styles.optionContainer}>
          {seasonOptions.map((item) => (
            <div
              key={item}
              className={`${styles.optionCard} ${
                selectedSeasons.includes(item) ? styles.active : ""
              }`}
              onClick={() => toggleSelection(item)}
            >
              {item}
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
