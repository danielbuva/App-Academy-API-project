import useProfileMenu from "../../../hooks/useProfileMenu";
import useIsLoaded from "../../../hooks/useIsLoaded";

import Menu from "./Menu/Index";
import MenuButton from "./Menu/MenuButton";

function UserMenu() {
  const { buttonRef, setShow, show } = useProfileMenu();
  const isLoaded = useIsLoaded();

  if (!isLoaded) return null;

  return (
    <div style={{ position: "relative" }}>
      <MenuButton buttonRef={buttonRef} setShow={setShow} show={show} />
      {show && <Menu />}
    </div>
  );
}

export default UserMenu;
