import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Stars from "./Stars";

import {
  createReview,
  deleteReview,
  updateReview,
} from "../../../../store/reviews";
import { useModalContext } from "../../../../hooks/useModalContext";
import useSessionUser from "../../../../hooks/useSessionUser";

function Review({ id, spotId }) {
  const reviewToEdit = useSelector((s) => s.reviews.review);
  const [review, setReview] = useState(reviewToEdit.review ?? "");
  const [stars, setStars] = useState(reviewToEdit.stars ?? 0);
  const dispatch = useDispatch();
  const { closeModal } = useModalContext();
  const user = useSessionUser();

  const isEditing = reviewToEdit?.stars;

  const handleClick = () => {
    dispatch(createReview(id, spotId ?? id, { review, stars }, user));
    closeModal();
  };

  const handleDelete = () => {
    dispatch(deleteReview(id, spotId));
    closeModal();
  };

  const handleUpdate = () => {
    dispatch(
      updateReview(id, { review, stars }, user, reviewToEdit.stars, spotId)
    );
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
      <div>
        {isEditing && <button onClick={handleDelete}>Delete</button>}
        <button
          className="spot-button"
          onClick={isEditing ? handleUpdate : handleClick}
          disabled={review.length < 10 || stars === 0}
        >
          {isEditing ? "Update" : "Submit your review"}
        </button>
      </div>
    </div>
  );
}

export default Review;
