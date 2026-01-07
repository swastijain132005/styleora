import React, { useState } from 'react'
import styles from './step3.module.css'

export default function Step3({ data, onSave, onClose }) {

  const skinTones = [
    { id: 1, name: "Very Fair", color: "#f6e2d3" },
    { id: 2, name: "Fair", color: "#f1c27d" },
    { id: 3, name: "Light", color: "#e0ac69" },
    { id: 4, name: "Medium", color: "#c68642" },
    { id: 5, name: "Olive", color: "#8d5524" },
    { id: 6, name: "Dark", color: "#5a3a1a" }
  ];

  const [selectedTone, setSelectedTone] = useState(data.skinTone || null);
  const [size, setSize] = useState(data.size || "");

  const handleSave = () => {
    onSave({
      size,
      skinTone: selectedTone
    });
    onClose();
  };

  return (
    <div className={styles.step3}>
        <div className={styles.container}>

      {/* Size */}
      <div className={styles.size}>
        <select value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="">Select size</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </div>

      {/* Skin tone */}
      <div className={styles.skinTone}>
        <h4>Select your skin tone</h4>

        <div className={styles.palette}>
          {skinTones.map(tone => (
            <div
              key={tone.id}
              className={`${styles.swatch} ${
                selectedTone === tone.id ? styles.active : ''
              }`}
              style={{ backgroundColor: tone.color }}
              onClick={() => setSelectedTone(tone.id)}
              title={tone.name}
            />
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={handleSave}
          disabled={!size}
        >
          Save
        </button>

        <button className={styles.buttonSkip} onClick={onClose}>
          Skip
        </button>
      </div>
</div>
    </div>
  )
}
