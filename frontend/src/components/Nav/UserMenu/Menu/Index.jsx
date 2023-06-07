import useSessionUser from "../../../../hooks/useSessionUser";

import OpenModalButton from "../../../Modal/OpenModalButton";
import SignupForm from "../../../Forms/SignUpForm";
import LoginForm from "../../../Forms/LoginForm";

import { useDispatch } from "react-redux";

import { logout } from "../../../../store/session";

import "./menu.css";
import Divider from "../../../Divider";
import { NavLink, useHistory } from "react-router-dom";

function UserMenu({ setShow, userMenuRef }) {
  const currentUser = useSessionUser();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
    setShow(false);
  };

  return (
    <div className="profile-dropdown" ref={userMenuRef}>
      <p>{currentUser.username}</p>
      <p>
        Hello {currentUser.firstName} {currentUser.lastName} :)
      </p>
      <p>{currentUser.email}</p>
      <Divider margin={7} />
      <NavLink
        exact
        to="/spots/current"
        id="manage-spots-button"
        onClick={() => setShow(false)}
      >
        Manage Spots
      </NavLink>
      <Divider margin={7} />
      <button onClick={handleLogOut} id="logout-button">
        Log Out
      </button>
    </div>
  );
}

function AuthMenu({ setShow }) {
  const handleClick = () => setShow(false);
  return (
    <div className="profile-dropdown">
      <OpenModalButton
        text="Sign up"
        content={<SignupForm />}
        onClick={handleClick}
      />
      <OpenModalButton
        text="Log in"
        content={<LoginForm />}
        onClick={handleClick}
      />
    </div>
  );
}

function Menu({ setShow, userMenuRef }) {
  const currentUser = useSessionUser();

  return currentUser ? (
    <UserMenu userMenuRef={userMenuRef} setShow={setShow} />
  ) : (
    <AuthMenu setShow={setShow} />
  );
}

export default Menu;
