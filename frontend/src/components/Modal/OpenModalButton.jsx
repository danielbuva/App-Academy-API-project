import React from "react";
import { useModalContext } from "../../hooks/useModalContext";

import "./Modal.css";

function OpenModalButton({ content, onClick, onClose, text }) {
  const { setContent, setOnClose } = useModalContext();

  if (typeof onClick !== "function" && onClick) {
    throw new TypeError(
      `Expected 'onClick' prop to be a function, but received ${typeof onClick}.`
    );
  }

  if (typeof onClose !== "function" && onClose) {
    throw new TypeError(
      `Expected 'onClose' prop to be a function, but received ${typeof onClose}.`
    );
  }

  const handleClick = () => {
    if (onClick) onClick();
    if (onClose) setOnClose(onClose);
    setContent(content);
  };

  return (
    <button
      onClick={handleClick}
      // style={{ all: "unset" }}
      className="button"
    >
      {text}
    </button>
  );
}

export default OpenModalButton;
