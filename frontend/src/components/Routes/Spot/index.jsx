import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpot } from "../../../store/spots";
import SpotHeader from "./SpotHeader";
import SpotImages from "./SpotImages";

import "./Spot.css";

function Spot() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.spot);

  useEffect(() => {
    dispatch(getSpot(id));
  }, [dispatch, id]);

  if (!spot || !spot.Owner) return null;

  console.log({ spot });

  return (
    <div id="spot">
      <SpotHeader />
      <SpotImages />
      <p>
        Hosted by {spot.Owner.firstName}, {spot.Owner.lastName}
      </p>
    </div>
  );
}

export default Spot;
