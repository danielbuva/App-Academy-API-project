import useSessionUser from "../../../../hooks/useSessionUser";

import OpenModalButton from "../../../Modal/OpenModalButton";
import SignupForm from "../../../SignUpForm";
import LoginForm from "../../../LoginForm";

import { useDispatch } from "react-redux";

import { logout } from "../../../../store/session";

import "./menu.css";

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
      <p>
        <button onClick={handleLogOut}>Log Out</button>
      </p>
    </div>
  );
}

function AuthMenu() {
  return (
    <div className="profile-dropdown">
      <OpenModalButton text="Log In" content={<LoginForm />} />
      <OpenModalButton text="Sign Up" content={<SignupForm />} />
    </div>
  );
}

function Menu() {
  const currentUser = useSessionUser();

  return currentUser ? <UserMenu /> : <AuthMenu />;
}

export default Menu;
