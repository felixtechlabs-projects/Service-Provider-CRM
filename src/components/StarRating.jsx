import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const stars = [...Array(5)];

  return (
    <div>
      {stars.map((_, i) => {
        const value = i + 1;
        return (
          <FaStar

            key={value}
            color={value <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            onClick={() => setRating(value)}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(0)}
            style={{ cursor: "pointer", display: "flex" }}
          />
        );
      })}
    </div>
  );
};

export default StarRating