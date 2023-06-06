import Star from "./Star.svg";

function Tile({ image, location, rating, price }) {
  const preview =
    image !== null ? (
      <img
        src={"https://i.imgur.com/IsAlUfg.png"}
        alt={image}
        style={{
          maxWidth: "100%",
          height: "100%",
          borderRadius: "12px",
          objectFit: "cover",
        }}
      />
    ) : (
      // "no preview"
      <img
        src={"https://i.imgur.com/IsAlUfg.png"}
        alt={image}
        style={{
          maxWidth: "100%",
          height: "100%",
          borderRadius: "12px",
          objectFit: "cover",
        }}
      />
    );
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
