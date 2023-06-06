import { useSelector } from "react-redux";

function SpotHeader() {
  const spot = useSelector((state) => state.spots.spot);

  if (!spot) return null;

  return (
    <>
      <p>{spot.name}</p>
      <p>{spot.city}</p>
      <p>{spot.state}</p>
      <p>{spot.country}</p>
    </>
  );
}

export default SpotHeader;
