import { useModalContext } from "../../../../hooks/useModalContext";
import { deleteSpot } from "../../../../store/spots";
import { useDispatch } from "react-redux";

import "./Delete.css";

function Delete({ id }) {
  const { closeModal } = useModalContext();
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteSpot(id));
    closeModal();
  };
  return (
    <div id="delete-content">
      <p>Are you sure you want to remove this spot from the listings?</p>
      <div id="delete-options">
        <button id="no-option" onClick={closeModal}>
          No (keep Spot)
        </button>
        <button className="spot-button" onClick={handleDelete}>
          Yes (Delete Spot)
        </button>
      </div>
    </div>
  );
}

export default Delete;
