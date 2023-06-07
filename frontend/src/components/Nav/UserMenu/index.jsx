import useProfileMenu from "../../../hooks/useProfileMenu";
import useIsLoaded from "../../../hooks/useIsLoaded";

import Menu from "./Menu/Index";
import MenuButton from "./Menu/MenuButton";
import CreateANewSpot from "../CreateANewSpot";
import useSessionUser from "../../../hooks/useSessionUser";

function UserMenu() {
  const { buttonRef, setShow, show, userMenuRef } = useProfileMenu();
  const isLoaded = useIsLoaded();
  const user = useSessionUser();

  if (!isLoaded) return null;

  return (
    <div
      style={{
        position: "relative",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
      }}
    >
      {user && <CreateANewSpot />}
      <MenuButton buttonRef={buttonRef} setShow={setShow} show={show} />
      {show && <Menu userMenuRef={userMenuRef} setShow={setShow} />}
    </div>
  );
}

export default UserMenu;
