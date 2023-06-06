import "./TypePage.css";
import TypeTiles from "./TypeTile";

function TypePage({ type, setType }) {
  return (
    <div id="type-page">
      <p style={{ fontSize: "32px", fontWeight: 500 }}>
        Which of these best describes your place?
      </p>
      <TypeTiles type={type} setType={setType} />
    </div>
  );
}

export default TypePage;
