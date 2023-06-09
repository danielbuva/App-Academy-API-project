import useSessionUser from "../../../../hooks/useSessionUser";

import OpenModalButton from "../../../Modal/OpenModalButton";
import Review from "./Review";

function ReviewButton({ id }) {
  const user = useSessionUser();
  if (!user) return null;
  return (
    <OpenModalButton
      text="Post a review"
      title="How was your stay?"
      content={<Review id={id} />}
    />
  );
}

export default ReviewButton;
