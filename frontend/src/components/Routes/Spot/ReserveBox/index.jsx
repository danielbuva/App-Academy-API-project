import useSpot from "../../../../hooks/useSpot";
import Rating from "./Rating";

function ReserveBox() {
  const spot = useSpot();
  return (
    <div id="reserve-container">
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p>
          <span style={{ fontWeight: 600, fontSize: "23px" }}>
            ${spot.price}
          </span>{" "}
          night
        </p>
        <Rating />
      </div>
      <button
        className="spot-button"
        style={{ width: "100%" }}
        onClick={() => alert("Feature coming soon")}
      >
        Reserve
      </button>
      <p style={{ color: "#696969", fontSize: "14px" }}>
        You won't be charged yet
      </p>
    </div>
  );
}

export default ReserveBox;
