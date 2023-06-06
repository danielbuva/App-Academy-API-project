import { useSelector } from "react-redux";

function SpotImages() {
  const spot = useSelector((state) => state.spots.spot);

  if (!spot || !spot.SpotImages) return null;

  return (
    <div style={{ width: "100%" }}>
      {spot.SpotImages.map((image) => (
        <img src={image.url} alt={image.url} key={image.id} />
      ))}
    </div>
  );
}

export default SpotImages;
