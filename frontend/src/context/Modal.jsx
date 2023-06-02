import { createContext, useRef, useState } from "react";

export const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [content, setContent] = useState(null);
  const [onClose, setOnClose] = useState(null);
  const modalRef = useRef(null);

  const closeModal = () => {
    setContent(null);
    if (typeof onClose === "function") {
      onClose();
      setOnClose(null);
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
