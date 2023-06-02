import ReactDOM from "react-dom";
import { useModalContext } from "../../hooks/useModalContext";

import "./Modal.css";

function Modal() {
  const { modalRef, modalContent, closeModal } = useModalContext();

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={closeModal} />
      <div id="modal-content">{modalContent}</div>
    </div>,
    modalRef.current
  );
}
export default Modal;
