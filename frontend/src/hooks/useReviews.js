import { useSelector } from "react-redux";

export default function useReviews() {
  return useSelector((s) => s.reviews.reviews);
}
