import Hambuger from "./icons/Hambuerger";
import ProfileIcon from "./icons/ProfileIcon";

function MeniButton({ ref, setShow, show }) {
  return (
    <div
      style={{
        width: "60px",
        padding: "5px 5px 5px 12px",
        // height: "42px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "solid #3A3E41",
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
