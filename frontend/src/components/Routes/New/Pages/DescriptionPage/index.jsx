import FormError from "../../../../Forms/FormError";
import "./DescriptionPage.css";

function DescriptionPage({ errors, description, setDescription }) {
  const counter = `${description.length} / 500`;
  const color = description.length >= 500 ? "#ff0000" : "#000";

  return (
    <div id="description-page">
      <p style={{ fontSize: "30px", fontWeight: 500, marginTop: 0 }}>
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
      <FormError errors={errors} />
    </div>
  );
}

export default DescriptionPage;
