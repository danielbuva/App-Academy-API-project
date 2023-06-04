import Warning from "./Warning.svg";

function WarningIcon() {
  return (
    <div
      style={{
        height: "100%",
        width: "46px",
        backgroundColor: "#FD642D",
        borderTopLeftRadius: "12px",
        borderBottomLeftRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={Warning}
        alt="error"
        style={{ width: "24px", height: "22px" }}
      />
    </div>
  );
}

export default WarningIcon;
