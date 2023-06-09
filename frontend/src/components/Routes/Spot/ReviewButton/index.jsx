import useReviews from "../../../../hooks/useReviews";
import useSessionUser from "../../../../hooks/useSessionUser";

import OpenModalButton from "../../../Modal/OpenModalButton";
import Review from "./Review";

function ReviewButton({ id }) {
  const user = useSessionUser();
  const reviews = useReviews();

  const userHasReview = reviews.find((r) => r.User.id === user.id);

  if (!user || userHasReview) return null;

  const text =
    reviews.length > 0
      ? "Post a review"
      : "Be the first to post a review!";
  return (
    <OpenModalButton
      text={text}
      title="How was your stay?"
      content={<Review id={id} />}
    />
  );
}

export default ReviewButton;
