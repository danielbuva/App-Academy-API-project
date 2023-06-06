import useSpot from "../../../hooks/useSpot";

function SpotHeader() {
  const spot = useSpot();

  if (!spot) return null;

  return (
    <>
      <h2>{spot.name}</h2>
      <p style={{ marginBottom: "30px" }}>
        {spot.city}, {spot.state}, {spot.country}
      </p>
    </>
  );
}

export default SpotHeader;
