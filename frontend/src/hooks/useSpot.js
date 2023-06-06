import { useSelector } from "react-redux";

export default function useSpot() {
  return useSelector((s) => s.spots.spot);
}
