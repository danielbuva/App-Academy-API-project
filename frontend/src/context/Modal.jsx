import { createContext, useRef, useState } from "react";

export const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [content, setContent] = useState(null);
  const [onClose, setOnClose] = useState(null);
  const modalRef = useRef();

  const closeModal = () => {
    setContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it
    // to null:
    if (typeof onModalClose === "function") {
      setOnClose(null);
      onClose();
    }
  };

  const value = {
    closeModal,
    content,
    modalRef,
    onClose,
    setContent,
    setOnClose,
  };

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}


