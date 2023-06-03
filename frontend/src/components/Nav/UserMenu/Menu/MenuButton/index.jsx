import Hambuger from "./icons/Hambuerger";
import ProfileIcon from "./icons/ProfileIcon";

function MeniButton({ ref, setShow, show }) {
  return (
    <div
      style={{
        width: "58px",
        padding: "5px 5px 5px 12px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "solid #DDDDDD 1px",
        borderRadius: "21px",
      }}
      onClick={() => setShow(!show)}
      ref={ref}
    >
      <Hambuger />
      <ProfileIcon />
    </div>
  );
}

export default MeniButton;
