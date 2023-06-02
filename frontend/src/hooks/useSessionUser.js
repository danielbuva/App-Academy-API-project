import { useSelector } from "react-redux";

export default function useSessionUser() {
  return useSelector((state) => state.session.user);
}
