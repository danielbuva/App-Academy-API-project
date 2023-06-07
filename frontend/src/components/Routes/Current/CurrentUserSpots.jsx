import { useEffect } from "react";
import Tile from "./Tile";
import { useDispatch, useSelector } from "react-redux";
import { getAllCurrentUsersSpots } from "../../../store/spots";

function CurrentUserSpots() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);

  useEffect(() => {
    dispatch(getAllCurrentUsersSpots());
  }, [dispatch]);

  console.log({ spots });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "left",
        gap: "40px",
        width: "100%",
        height: "max-content",
        flexWrap: "wrap",
      }}
    >
      {spots &&
        spots.map(
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

export default CurrentUserSpots;
