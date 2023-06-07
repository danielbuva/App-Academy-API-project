import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpot } from "../../../store/spots";
import SpotHeader from "./SpotHeader";
import SpotImages from "./SpotImages";
import ReserveBox from "./ReserveBox";
import Divider from "../../Divider";

import useSpot from "../../../hooks/useSpot";

import "./Spot.css";
import Rating from "./ReserveBox/Rating";

function Spot() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const spot = useSpot();

  useEffect(() => {
    dispatch(getSpot(id));
  }, [dispatch, id]);

  if (!spot || !spot.Owner) return null;

  return (
    <div id="spot">
      <SpotHeader />
      <SpotImages />
      <div
        style={{
          display: "flex",
          marginTop: "40px",
          width: "100%",
          gap: "100px",
        }}
      >
        <div>
          <h3>
            {spot.place} in a {spot.type} hosted by {spot.Owner.firstName},{" "}
            {spot.Owner.lastName}
          </h3>
          <Divider marginBottom="40px" />
          <p>{spot.description}</p>
        </div>
        <ReserveBox />
      </div>
      <Divider marginTop="40px" />
      <Rating size={1} />
    </div>
  );
}

export default Spot;
