import "./TypePage.css";
import TypeTiles from "./TypeTile";

function TypePage({ type, setType }) {
  return (
    <div id="type-page">
      <p id="type-page-header">
        Which of these best describes your place?
      </p>
      <TypeTiles type={type} setType={setType} />
    </div>
  );
}

export default TypePage;
