import Tooltip from "../../../Tooltip";
import Preview from "../Preview";
import Star from "../Star.svg";
import OpenModalButton from "../../../Modal/OpenModalButton";

import { useHistory } from "react-router-dom";
import Delete from "../Delete";

import "./Tile.css";

function Tile({ spot }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/spots/${spot.id}`);
  };

  const preview =
    spot.previewImages.length > 0 ? (
      <Preview images={spot.previewImages} id={spot.id} />
    ) : (
      "no preview"
    );

  const stars = spot.rating ?? "New";

  const handleUpdate = () => {
    const spotProps = {
      id: spot.id,
      initialType: spot.type,
      initialPlace: spot.place,
      initialCountry: spot.country,
      initialAddress: spot.address,
      initialAddressNumber: spot.AddressNumber,
      initialCity: spot.city,
      initialStateOrTerritory: spot.state,
      initialZipcode: spot.zipcode,
      initialPreviewUrl: spot.previewImages[spot.previewImages.length - 1],
      initialUrl1: spot.previewImages[spot.previewImages.length - 2],
      initialUrl2: spot.previewImages[spot.previewImages.length - 3],
      initialUrl3: spot.previewImages[spot.previewImages.length - 4],
      initialUrl4: spot.previewImages[spot.previewImages.length - 5],
      initialName: spot.name,
      initialDescription: spot.description,
      initialPrice: spot.price,
    };
    history.push({ pathname: `/spots/${spot.id}/edit`, state: spotProps });
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Tooltip label={spot.name}>
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
            <p style={{ fontWeight: 600 }}>{spot.location}</p>
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
            <span style={{ fontWeight: 600 }}>${spot.price}</span> night
          </p>
        </div>
      </Tooltip>
      <div id="manage-buttons">
        <button onClick={handleUpdate} id="update-button">
          update
        </button>
        <OpenModalButton
          text="Delete"
          title="Confirm Delete"
          content={<Delete id={spot.id} />}
          id="delete-button"
        />
      </div>
    </div>
  );
}

export default Tile;
