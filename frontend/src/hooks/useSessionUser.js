import { useSelector } from "react-redux";

export default function useSessionUser() {
  return useSelector((s) => s.session.user);
}
