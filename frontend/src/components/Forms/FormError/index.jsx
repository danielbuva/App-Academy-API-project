import WarningIcon from "./Warning";

function FormError({ errors }) {
  const messages = [];
  const errorKeys = Object.keys(errors);
  const errorsLength = errorKeys.length;

  if (errorsLength < 1) return null;

  for (let i = 0; i < errorsLength; i++) {
    let error = errors[errorKeys[i]];
    error = error.message ?? error;
    messages.push(
      <p
        key={i}
        style={{
          fontSize: "15px",
          paddingLeft: "8px",
          margin: 0,
        }}
      >
        {error}
      </p>
    );
  }

  return (
    <div
      style={{
        height: `${50 + 12 * messages.length}px`,
        width: "100%",
        border: "solid 1px #ebebeb",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        borderRadius: "12px",
        margin: "5px 0px 10px 0px",
      }}
    >
      <WarningIcon />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {messages}
      </div>
    </div>
  );
}

export default FormError;
