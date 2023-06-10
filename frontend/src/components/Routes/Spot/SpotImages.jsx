import useSpot from "../../../hooks/useSpot";

import "./Spot.css";

function SpotImages() {
  const spot = useSpot();

  if (!spot || !spot.SpotImages) return null;

  const hasOneImageOnly = spot.SpotImages.length === 1;

  return (
    <div id="images">
      {spot.SpotImages[0] && (
        <img
          src={spot.SpotImages[0].url}
          alt={spot.SpotImages[0].url}
          id={hasOneImageOnly ? "preview-image" : "main-image"}
        />
      )}
      <div id="right-images">
        {spot.SpotImages[1] && (
          <img
            src={spot.SpotImages[1].url}
            alt={spot.SpotImages[1].url}
            className="image-section"
          />
        )}
        {spot.SpotImages[2] && (
          <img
            src={spot.SpotImages[2].url}
            alt={spot.SpotImages[2].url}
            className="image-section"
          />
        )}
        {spot.SpotImages[3] && (
          <img
            src={spot.SpotImages[3].url}
            alt={spot.SpotImages[3].url}
            className="image-section"
          />
        )}
        {spot.SpotImages[4] && (
          <img
            src={spot.SpotImages[4].url}
            alt={spot.SpotImages[4].url}
            className="image-section"
          />
        )}
      </div>
    </div>
  );
}

export default SpotImages;
