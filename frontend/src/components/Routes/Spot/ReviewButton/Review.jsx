import { useState } from "react";
import { useDispatch } from "react-redux";

import Stars from "./Stars";

import { createReview } from "../../../../store/reviews";
import { useModalContext } from "../../../../hooks/useModalContext";
import useSessionUser from "../../../../hooks/useSessionUser";
import { updateReviews } from "../../../../store/spots";

function Review({ id }) {
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const dispatch = useDispatch();
  const { closeModal } = useModalContext();
  const user = useSessionUser();

  const handleClick = () => {
    dispatch(createReview(id, { review, stars }, user));
    dispatch(updateReviews(stars));
    closeModal();
  };

  return (
    <div id="review-content">
      <textarea
        id="review-input"
        placeholder="leave your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <Stars stars={stars} setStars={setStars} />
      <button
        className="spot-button"
        onClick={handleClick}
        disabled={review.length < 10 || stars === 0}
      >
        Submit your review
      </button>
    </div>
  );
}

export default Review;
