import FormError from "../../../../Forms/FormError";
import "./TitlePage.css";

function TitlePage({ errors, type, name, setName }) {
  if (!type || typeof type !== "string") return null;

  const counter = `${name.length} / 50`;
  const color = name.length >= 51 ? "#ff0000" : "#000";
  return (
    <div id="title-page">
      <p style={{ fontSize: "30px", fontWeight: 500 }}>
        Now, let's give your {type.toLowerCase()}
      </p>
      <p>
        Short titles work best. Have fun with it—you can always change it
        later.
      </p>
      <label htmlFor="title" className="hidden-label" />
      <textarea
        value={name}
        onChange={(e) => setName(e.target.value)}
        id="name-input"
      />
      <p style={{ color }}>{counter}</p>
      <FormError errors={errors} />
    </div>
  );
}

export default TitlePage;
