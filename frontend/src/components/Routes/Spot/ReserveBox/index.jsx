import useSpot from "../../../../hooks/useSpot";
import Rating from "./Rating";

function ReserveBox() {
  const spot = useSpot();
  return (
    <div
      style={{
        border: "solid 1px black",
        minWidth: "310px",
        height: "fit-content",
        borderRadius: "12px",
        padding: "0px 30px 0px 30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
      <button className="continue" style={{ width: "100%" }}>
        Reserve
      </button>
      <p style={{ color: "#696969", fontSize: "14px" }}>
        You won't be charged yet
      </p>
    </div>
  );
}

export default ReserveBox;
