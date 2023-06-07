import "./PlacePage.css";

function PlaceButton({ main, sub, icon, place, setPlace }) {
  const backgroundColor = place === main ? "#f7f7f7" : "#fff";
  const border = place === main ? "solid 1px #000" : "solid 1px #e7e7e7";

  return (
    <div
      className="place-box"
      onClick={() => setPlace(main)}
      style={{ backgroundColor, border }}
    >
      <div className="text">
        <p className="main-text">{main}</p>
        <p className="sub-text">{sub}</p>
      </div>
      {icon}
    </div>
  );
}

export default PlaceButton;
