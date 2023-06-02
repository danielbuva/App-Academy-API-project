import { useEffect, useRef, useState } from "react";

export default function useProfileMenu() {
  const [show, setShow] = useState(false);
  const profileButton = useRef(null);

  useEffect(() => {
    const closeMenu = (e) => {
      if (
        profileButton.current &&
        !profileButton.current.contains(e.target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, []);

  return { profileButton, setShow, show };
}
