import { useModalContext } from "../../../../hooks/useModalContext";
import { deleteSpot } from "../../../../store/spots";
import { useDispatch } from "react-redux";

function Delete({ id }) {
  const { closeModal } = useModalContext();
  const dispatch = useDispatch();
  const handleDelete = () => {
    console.log("clicking");
    dispatch(deleteSpot(id));
    closeModal();
  };
  return (
    <div>
      <p>Are you sure you want to remove this spot from the listings?</p>
      <button className="spot-button" onClick={handleDelete}>
        Yes (Delete Spot)
      </button>
      <button onClick={closeModal}>No (keep Spot)</button>
    </div>
  );
}

export default Delete;
