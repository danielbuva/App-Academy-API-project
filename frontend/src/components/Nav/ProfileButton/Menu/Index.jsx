import useSessionUser from "../../../../hooks/useSessionUser";

import OpenModalButton from "../../../Modal/OpenModalButton";
import SignupForm from "../../../SignUpForm";
import LoginForm from "../../../LoginForm";

import { useDispatch } from "react-redux";

import { logout } from "../../../../store/session";

function UserMenu() {
  const currentUser = useSessionUser();
  const dispatch = useDispatch();

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <ul className="profile-dropdown">
      <li>{currentUser.username}</li>
      <li>
        {currentUser.firstName} {currentUser.lastName}
      </li>
      <li>{currentUser.email}</li>
      <li>
        <button onClick={handleLogOut}>Log Out</button>
      </li>
    </ul>
  );
}

function AuthMenu() {
  return (
    <ul className="profile-dropdown">
      <li>
        <OpenModalButton text="Log In" content={<LoginForm />} />
      </li>
      <li>
        <OpenModalButton text="Sign Up" content={<SignupForm />} />
      </li>
    </ul>
  );
}

function Menu() {
  const currentUser = useSessionUser();

  return currentUser ? <UserMenu /> : <AuthMenu />;
}

export default Menu;
