import React from "react";
import { useModal } from "../../context/Modal";

function OpenModalButton({ content, onClick, onClose, text }) {
  const { setContent, setOnClose } = useModal();

  if (typeof onClick !== "function") {
    throw new TypeError(
      `Expected 'onClick' prop to be a function, but received ${typeof onClick}.`
    );
  }

  if (typeof onClose !== "function") {
    throw new TypeError(
      `Expected 'onClose' prop to be a function, but received ${typeof onClose}.`
    );
  }

  const handleClick = () => {
    onClick();
    setOnClose(onClose);
    setContent(content);
  };

  return <button onClick={handleClick}>{text}</button>;
}

export default OpenModalButton;
