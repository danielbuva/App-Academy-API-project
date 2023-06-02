import ProfileIcon from "./ProfileIcon.svg";

import useProfileMenu from "../../../hooks/useProfileMenu";
import useIsLoaded from "../../../hooks/useIsLoaded";
import Menu from "./Menu/Index";

function ProfileButton() {
  const { profileButton, setShow, show } = useProfileMenu();
  const isLoaded = useIsLoaded();

  if (!isLoaded) return null;

  return (
    <>
      <div
        style={{ width: "35px", height: "35px", cursor: "pointer" }}
        onClick={() => setShow(!show)}
        ref={profileButton}
      >
        <img src={ProfileIcon} alt="Profile" />
      </div>

      {show && <Menu />}
    </>
  );
}

export default ProfileButton;
