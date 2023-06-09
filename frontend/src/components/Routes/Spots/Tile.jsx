import Tooltip from "../../Tooltip";
import Preview from "./Preview";
import Star from "./Star.svg";

import { useHistory } from "react-router-dom";

function Tile({ images, location, rating, price, id, name }) {
  const history = useHistory();
  const preview =
    images.length > 0 ? <Preview images={images} id={id} /> : "no preview";
  const stars = rating?.toFixed(2) ?? "New";

  const handleClick = () => {
    history.push(`/spots/${id}`);
  };

  return (
    <Tooltip label={name}>
      <div
        style={{
          width: "370px",
          height: "100%",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        {preview}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p style={{ fontWeight: 600 }}>{location}</p>
          <div
            style={{
              display: "flex",
            }}
          >
            <img
              src={Star}
              alt="star"
              style={{ width: "12px", marginRight: "5px" }}
            />
            <p>{stars}</p>
          </div>
        </div>
        <p>
          <span style={{ fontWeight: 600 }}>${price}</span> night
        </p>
      </div>
    </Tooltip>
  );
}

export default Tile;
