import Preview from "./Preview";
import Star from "./Star.svg";

function Tile({ images, location, rating, price, id }) {
  const preview =
    images.length > 0 ? <Preview images={images} id={id} /> : "no preview";
  return (
    <div
      style={{
        width: "370px",
        height: "350px",
      }}
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
          <p>{rating}</p>
        </div>
      </div>
      <p>
        <span style={{ fontWeight: 600 }}>${price}</span> night
      </p>
    </div>
  );
}

export default Tile;
