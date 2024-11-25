import React, { useState } from 'react';
import "../styles/styles.css";

function RatingSection({ onRate }) {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  return (
    <div>
      <label>
        Calificación:
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={handleRatingChange}
        />
      </label>
      <button onClick={() => onRate(rating)}>Enviar calificación</button>
    </div>
  );
}

export default RatingSection;
