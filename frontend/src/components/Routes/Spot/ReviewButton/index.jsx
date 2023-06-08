import useSessionUser from "../../../../hooks/useSessionUser";

function ReviewButton() {
  const user = useSessionUser();
  if (!user) return null;
  return <button>Post your review</button>;
}

export default ReviewButton;
