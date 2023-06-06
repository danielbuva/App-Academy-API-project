import { typesOfPlaces } from "./typesOfPlaces";

function TypeTiles({ type: place, setType }) {
  const handleClick = (type) => {
    setType(type);
  };

  return (
    <div id="type-tiles">
      {typesOfPlaces.map(({ icon, type }, i) => {
        const border =
          place === type ? "solid 1px #000" : "solid 1px #d7d7d7";
        const backgroundColor = place === type ? "#f7f7f7" : "unset";
        return (
          <div
            className="type-tile"
            key={i + type}
            style={{ border, backgroundColor }}
            onClick={() => handleClick(type)}
          >
            <img
              src={icon}
              alt={icon}
              id="type-icon"
              style={{ marginBottom: -18, paddingTop: "10px" }}
            />
            <p style={{ fontWeight: 600 }}>{type}</p>
          </div>
        );
      })}
    </div>
  );
}

export default TypeTiles;
