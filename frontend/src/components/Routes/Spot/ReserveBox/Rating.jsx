import useSpot from "../../../../hooks/useSpot";
import Star from "../../Spots/Star.svg";

function Rating({ size = 0 }) {
  const spot = useSpot();
  if (!spot) return null;

  const text = spot.numReviews > 1 ? "reviews" : "review";

  const reviews =
    spot.numReviews && spot.numReviews > 0 ? (
      <p>
        {spot.avgStarRating} ·{" "}
        <span style={{ color: "#797979" }}>
          {spot.numReviews} {text}
        </span>
      </p>
    ) : (
      "New"
    );
  const reviews1 =
    spot.numReviews && spot.numReviews > 0 ? (
      <p style={{ fontSize: "20px" }}>
        {spot.avgStarRating} ·{" "}
        <span style={{ color: "#797979" }}>
          {spot.numReviews} {text}
        </span>
      </p>
    ) : (
      "New"
    );

  return size === 0 ? (
    <div style={{ display: "flex" }}>
      <img
        src={Star}
        alt="star"
        style={{ width: "12px", marginRight: "5px" }}
      />
      {reviews}
    </div>
  ) : (
    <div style={{ display: "flex" }}>
      <img
        src={Star}
        alt="star"
        style={{ width: "24px", marginRight: "5px" }}
      />
      {reviews1}
    </div>
  );
}

export default Rating;
