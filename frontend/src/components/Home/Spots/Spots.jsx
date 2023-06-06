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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      {spots &&
        spots.map(
          ({ id, price, city, state, avgRating, previewImage }) => {
            return (
              <Tile
                key={id}
                price={price}
                location={`${city}, ${state}`}
                rating={avgRating}
                image={previewImage}
              />
            );
          }
        )}
    </div>
  );
}

export default Spots;
