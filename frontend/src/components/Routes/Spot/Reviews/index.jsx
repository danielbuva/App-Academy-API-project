import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Review from "./Review";

import { getReviews } from "../../../../store/reviews";
import useReviews from "../../../../hooks/useReviews";

function Reviews() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const reviews = useReviews();

  useEffect(() => {
    dispatch(getReviews(id));
  }, [dispatch, id]);

  if (!reviews) return null;

  console.log({ reviews });

  return (
    <div id="reviews">
      {reviews
        .slice()
        .reverse()
        .map((r) => (
          <Review
            key={r.id}
            id={r.id}
            name={r.User.firstName}
            date={r.updatedAt}
            review={r.review}
            spotId={r.spotId ?? id}
            stars={r.stars}
            userId={r.User.id}
          />
        ))}
    </div>
  );
}

export default Reviews;
