import useSpot from "../../../../hooks/useSpot";
import Star from "../../Spots/Star.svg";

function Rating({ size = 0 }) {
  const spot = useSpot();
  if (!spot) return null;

  return size === 0 ? (
    <div style={{ display: "flex" }}>
      <img
        src={Star}
        alt="star"
        style={{ width: "12px", marginRight: "5px" }}
      />
      <p>
        {spot.avgStarRating} ·{" "}
        <span style={{ color: "#797979" }}>{spot.numReviews} reviews</span>
      </p>
    </div>
  ) : (
    <div style={{ display: "flex" }}>
      <img
        src={Star}
        alt="star"
        style={{ width: "24px", marginRight: "5px" }}
      />
      <p style={{ fontSize: "20px" }}>
        {spot.avgStarRating} ·{" "}
        <span style={{ color: "#797979" }}>{spot.numReviews} reviews</span>
      </p>
    </div>
  );
}

export default Rating;
