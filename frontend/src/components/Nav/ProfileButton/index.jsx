import ProfileIcon from "./ProfileIcon.svg";

import { useDispatch } from "react-redux";

import useProfileMenu from "../../../hooks/useProfileMenu";

import * as sessionActions from "../../../store/session";
import OpenModalButton from "../../Modal/OpenModalButton";
import LoginForm from "../../LoginForm";
import SignupForm from "../../SignUpForm";

function ProfileButton({ currentUser }) {
  const { profileButton, setShow, show } = useProfileMenu();
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const Menu = currentUser ? (
    <ul className="profile-dropdown">
      <li>{currentUser.username}</li>
      <li>
        {currentUser.firstName} {currentUser.lastName}
      </li>
      <li>{currentUser.email}</li>
      <li>
        <button onClick={logout}>Log Out</button>
      </li>
    </ul>
  ) : (
    <ul className="profile-dropdown">
      <li>
        <OpenModalButton text="Log In" content={<LoginForm />} />
      </li>
      <li>
        <OpenModalButton text="Sign Up" content={<SignupForm />} />
      </li>
    </ul>
  );

  return (
    <>
      <div
        style={{ width: "35px", height: "35px", cursor: "pointer" }}
        onClick={() => setShow(!show)}
        ref={profileButton}
      >
        <img src={ProfileIcon} alt="Profile" />
      </div>

      {show && Menu}
    </>
  );
}

export default ProfileButton;
