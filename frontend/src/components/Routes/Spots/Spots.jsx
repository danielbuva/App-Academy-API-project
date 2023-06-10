import { useEffect } from "react";
import Tile from "./Tile";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../../store/spots";

function Spots() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  if (!spots) return null;

  return (
    <div id="spots-container">
      {spots.map(
        ({ id, price, city, state, avgRating, previewImages, name }) => {
          return (
            <Tile
              key={id}
              id={id}
              price={price}
              location={`${city}, ${state}`}
              rating={avgRating}
              images={previewImages}
              name={name}
            />
          );
        }
      )}
    </div>
  );
}

export default Spots;
