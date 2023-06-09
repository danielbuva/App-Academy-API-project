import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Stars from "./Stars";

import {
  createReview,
  deleteReview,
  updateReview,
} from "../../../../store/reviews";
import { useModalContext } from "../../../../hooks/useModalContext";
import useSessionUser from "../../../../hooks/useSessionUser";
import Divider from "../../../Divider";

function Review({ id, spotId }) {
  const reviewToEdit = useSelector((s) => s.reviews.review);
  const [review, setReview] = useState(reviewToEdit.review ?? "");
  const [stars, setStars] = useState(reviewToEdit.stars ?? 0);
  const [showDelete, setShowDelete] = useState(false);
  const dispatch = useDispatch();
  const { closeModal } = useModalContext();
  const user = useSessionUser();
  const contentRef = useRef(null);

  const isEditing = reviewToEdit?.stars;

  const handleClick = () => {
    dispatch(createReview(id, spotId ?? id, { review, stars }, user));
    closeModal();
  };

  const handleDelete = () => {
    dispatch(deleteReview(id, spotId));
    closeModal();
    setShowDelete(false);
  };

  const handleUpdate = () => {
    dispatch(
      updateReview(id, { review, stars }, user, reviewToEdit.stars, spotId)
    );
    closeModal();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target)
      ) {
        setShowDelete(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div id="review-content">
      <textarea
        id="review-input"
        placeholder="leave your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <Stars stars={stars} setStars={setStars} />
      <div id="review-buttons">
        {isEditing && (
          <button
            id="delete-review-button"
            onClick={() => setShowDelete(!showDelete)}
          >
            Delete
          </button>
        )}
        <button
          className="spot-button"
          onClick={isEditing ? handleUpdate : handleClick}
          disabled={review.length < 10 || stars === 0}
        >
          {isEditing ? "Update" : "Submit your review"}
        </button>
      </div>
      {showDelete && (
        <div id="confirm-delete-review" ref={contentRef}>
          <p id="confirm-text">Are you sure you want to delete?</p>
          <Divider />
          <div id="confirm-buttons">
            <button onClick={handleDelete} className="spot-button">
              yes (delete)
            </button>
            <button onClick={() => setShowDelete(false)} id="confirm-no">
              no (go back)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Review;
