import ReactDOM from "react-dom";
import { useModalContext } from "../../hooks/useModalContext";

import X from "../../assets/X.svg";

import "./Modal.css";

function Modal() {
  const { closeModal, content, modalRef, title } = useModalContext();

  if (!content || !modalRef || !modalRef.current) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={closeModal} />
      <div id="modal-content">
        <div id="login-header">
          <button className="close-button" onClick={closeModal}>
            <img
              src={X}
              alt="close menu"
              style={{
                width: "16px",
                height: "16px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </button>
          <p id="title">{title}</p>
        </div>
        {content}
      </div>
    </div>,
    modalRef.current
  );
}
export default Modal;
