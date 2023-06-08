import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllCurrentUsersSpots } from "../../../store/spots";

import House from "./House.svg";

import Tile from "./Tile";

import "./CurrentUserSpots.css";

function CurrentUserSpots() {
  const dispatch = useDispatch();
  let spots = useSelector((state) => state.spots.allSpots);

  useEffect(() => {
    dispatch(getAllCurrentUsersSpots());
  }, [dispatch]);

  if (!spots) return null;

  return (
    <div id="current-spots-page">
      <p id="spots-header">Manage your spots</p>
      {spots.length === 0 ? (
        <div id="create-new-listing-box">
          <img src={House} alt="house" id="house-icon" />
          <p id="create-new-spot-header">Create a New Spot</p>
          <p style={{ marginTop: 0 }}>
            You don’t have any spots on ycshiyp right now. Create a new
            spot to start getting bookings.
          </p>
          <NavLink exact to="/spots/new" id="new-spot-page-link">
            Create a New Spot
          </NavLink>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default CurrentUserSpots;
