import { useDispatch } from "react-redux";
import useSessionUser from "../../../../hooks/useSessionUser";
import EditReviewButton from "./EditReviewButton";
import { setReview } from "../../../../store/reviews";

function getMonthYear(date) {
  const dateObj = new Date(date);
  return `${dateObj.toLocaleString("default", {
    month: "long",
  })} ${dateObj.getFullYear()}`;
}

function Review({ date, id, name, review, spotId, stars, userId }) {
  const user = useSessionUser();
  const dispatch = useDispatch();
  const monthYear = getMonthYear(date);
  const isReviewOwner = userId === user.id;
  const editButtonClick = () => {
    dispatch(setReview({ id, review, stars }));
  };

  return (
    <div className="review">
      <div className="review-content">
        <div>
          <p style={{ fontWeight: 600, marginBottom: 0 }}>{name}</p>
          <p style={{ marginTop: 0 }}> {monthYear}</p>
          {isReviewOwner && (
            <EditReviewButton
              onClick={editButtonClick}
              id={id}
              spotId={spotId}
            />
          )}
        </div>
        <p>{review}</p>
      </div>
    </div>
  );
}

export default Review;
