import useProfileMenu from "../../../hooks/useProfileMenu";

import Menu from "./Menu/Index";
import MenuButton from "./Menu/MenuButton";
import CreateANewSpot from "../CreateANewSpot";
import useSessionUser from "../../../hooks/useSessionUser";

function UserMenu() {
  const { buttonRef, setShow, show, userMenuRef } = useProfileMenu();
  const user = useSessionUser();

  return (
    <div
      style={{
        position: "relative",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        marginRight: "10px",
      }}
    >
      {user && <CreateANewSpot />}
      <MenuButton buttonRef={buttonRef} setShow={setShow} show={show} />
      {show && <Menu userMenuRef={userMenuRef} setShow={setShow} />}
    </div>
  );
}

export default UserMenu;
