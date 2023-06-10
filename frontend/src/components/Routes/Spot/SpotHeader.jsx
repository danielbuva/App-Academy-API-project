import useSpot from "../../../hooks/useSpot";

function SpotHeader() {
  const spot = useSpot();

  if (!spot) return null;

  return (
    <>
      <h2 id="spot-header">{spot.name}</h2>
      <p id="spot-subheader">
        {spot.city}, {spot.state}, {spot.country}
      </p>
    </>
  );
}

export default SpotHeader;
