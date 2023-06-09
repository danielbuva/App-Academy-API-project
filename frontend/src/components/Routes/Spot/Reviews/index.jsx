import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../../../store/reviews";
import { useParams } from "react-router-dom";
import Review from "./Review";

function Reviews() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const reviews = useSelector((s) => s.reviews.reviews);

  useEffect(() => {
    dispatch(getReviews(id));
  }, [dispatch, id]);

  if (!reviews) return null;

  console.log({ reviews });

  return (
    <div>
      {reviews.map((r) => (
        <Review
          name={r.User.firstName}
          date={r.updatedAt}
          review={r.review}
        />
      ))}
    </div>
  );
}

export default Reviews;
