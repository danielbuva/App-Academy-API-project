import useSessionUser from "../../../../hooks/useSessionUser";

import OpenModalButton from "../../../Modal/OpenModalButton";
import SignupForm from "../../../Forms/SignUpForm";
import LoginForm from "../../../Forms/LoginForm";

import { useDispatch } from "react-redux";

import { logout } from "../../../../store/session";

import "./menu.css";
import Divider from "../../../Divider";
import { NavLink } from "react-router-dom";

function UserMenu() {
  const currentUser = useSessionUser();
  const dispatch = useDispatch();

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className="profile-dropdown">
      <p>{currentUser.username}</p>
      <p>
        {currentUser.firstName} {currentUser.lastName}
      </p>
      <p>{currentUser.email}</p>
      <Divider margin={7} />
      <NavLink exact to="/spots/current">
        Manage Spots
      </NavLink>
      <Divider margin={7} />
      <button onClick={handleLogOut} id="logout-button">
        Log Out
      </button>
    </div>
  );
}

function AuthMenu() {
  return (
    <div className="profile-dropdown">
      <OpenModalButton text="Sign up" content={<SignupForm />} />
      <OpenModalButton text="Log in" content={<LoginForm />} />
    </div>
  );
}

function Menu() {
  const currentUser = useSessionUser();

  return currentUser ? <UserMenu /> : <AuthMenu />;
}

export default Menu;
