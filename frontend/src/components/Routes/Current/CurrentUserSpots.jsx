import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllCurrentUsersSpots } from "../../../store/spots";

import Tile from "./Tile";

function CurrentUserSpots() {
  const dispatch = useDispatch();
  let spots = useSelector((state) => state.spots.allSpots);

  useEffect(() => {
    dispatch(getAllCurrentUsersSpots());
  }, [dispatch]);

  console.log({ SpotsFromCurrUser: spots });

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <p>Manage your spots</p>
      <NavLink exact to="/spots/new" id="new-spot">
        Create a New Spot
      </NavLink>
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
          spots.length > 0 &&
          spots.map((spot) => {
            return <Tile key={spot.id} spot={spot} />;
          })}
      </div>
    </div>
  );
}

export default CurrentUserSpots;
