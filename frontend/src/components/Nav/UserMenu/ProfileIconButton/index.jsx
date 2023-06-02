import ProfileIcon from "./ProfileIcon.svg";

function ProfileIconButton({ ref, setShow, show }) {
  return (
    <div
      style={{ width: "35px", height: "35px", cursor: "pointer" }}
      onClick={() => setShow(!show)}
      ref={ref}
    >
      <img src={ProfileIcon} alt="Profile" />
    </div>
  );
}

export default ProfileIconButton;
