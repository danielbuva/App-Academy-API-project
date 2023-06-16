import { useState } from "react";
import "./Review.css";

const Stars = ({ stars, setStars }) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleRate = (selectedRating) => {
    setStars(selectedRating);
  };

  const handleStarHover = (hoveredRating) => {
    if (isDragging) {
      setStars(hoveredRating);
    } else {
      setHoveredRating(hoveredRating);
    }
  };

  return (
    <div
      className="star-rating"
      onMouseLeave={() => setHoveredRating(0)}
      onMouseUp={() => setIsDragging(false)}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= stars ? "filled" : ""}`}
          onClick={() => handleRate(star)}
          onMouseEnter={() => handleStarHover(star)}
          onMouseDown={() => setIsDragging(true)}
        >
          {star <= (isDragging ? stars : hoveredRating) ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

export default Stars;
