import { useEffect, useRef, useState } from "react";

export default function useProfileMenu() {
  const [show, setShow] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const closeMenu = (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        setShow(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, []);

  return { buttonRef, setShow, show };
}
