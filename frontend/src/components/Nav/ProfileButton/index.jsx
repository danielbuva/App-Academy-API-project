import ProfileIcon from "./ProfileIcon.svg";
function ProfileButton() {
  return (
    <div style={{ width: "35px", height: "35px", cursor: "pointer" }}>
      <img src={ProfileIcon} alt="Profile" />
    </div>
  );
}

export default ProfileButton;
