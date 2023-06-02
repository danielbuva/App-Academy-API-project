import ReactDOM from "react-dom";
import { useModalContext } from "../../hooks/useModalContext";

import "./Modal.css";

function Modal() {
  const { closeModal, content, modalRef } = useModalContext();

  if (!content || !modalRef || !modalRef.current) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={closeModal} />
      <div id="modal-content">{content}</div>
    </div>,
    modalRef.current
  );
}
export default Modal;
