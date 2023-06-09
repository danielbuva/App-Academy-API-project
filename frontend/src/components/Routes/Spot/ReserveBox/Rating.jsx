import useSpot from "../../../../hooks/useSpot";
import Star from "../../Spots/Star.svg";

function Rating({ size = 0 }) {
  const spot = useSpot();
  if (!spot) return null;

  const avgStars = spot.avgStarRating.toFixed(2);
  const rating = avgStars.endsWith("0") ? avgStars.slice(0, -1) : avgStars;

  const text = spot.numReviews > 1 ? "reviews" : "review";

  const reviews =
    spot.numReviews && spot.numReviews > 0 ? (
      <p>
        {rating} ·{" "}
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
        {rating} ·{" "}
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
    <div
      style={{
        alignItems: "center",
        display: "flex",
        gap: "10px",
        marginBottom: "10px",
        marginTop: "10px",
      }}
    >
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
