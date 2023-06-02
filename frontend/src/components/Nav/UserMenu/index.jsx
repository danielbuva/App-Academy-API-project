import useProfileMenu from "../../../hooks/useProfileMenu";
import useIsLoaded from "../../../hooks/useIsLoaded";

import ProfileIconButton from "./ProfileIconButton";
import Menu from "./Menu/Index";

function UserMenu() {
  const { profileButton, setShow, show } = useProfileMenu();
  const isLoaded = useIsLoaded();

  if (!isLoaded) return null;

  return (
    <>
      <ProfileIconButton
        ref={profileButton}
        setShow={setShow}
        show={show}
      />
      {show && <Menu />}
    </>
  );
}

export default UserMenu;
