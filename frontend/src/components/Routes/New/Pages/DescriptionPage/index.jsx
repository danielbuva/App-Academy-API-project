import "./DescriptionPage.css";

function DescriptionPage({ description, setDescription }) {
  const counter = `${description.length} / 500`;
  const color = description.length >= 500 ? "#ff0000" : "#000";

  return (
    <div id="description-page">
      <p style={{ fontSize: "30px", fontWeight: 500 }}>
        Create your description
      </p>
      <p>Share what makes your place special.</p>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        id="name-input"
        style={{ height: "250px" }}
      />
      <p style={{ color }}>{counter}</p>
    </div>
  );
}

export default DescriptionPage;
