import ProfileIcon from "./ProfileIcon.svg";

import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import * as sessionActions from "../../../store/session";
import OpenModalButton from "../../Modal/OpenModalButton";
import LoginForm from "../../LoginForm";
import SignupForm from "../../SignUpForm";

function ProfileButton({ user }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const profileButton = useRef(null);

  useEffect(() => {
    const closeMenu = (e) => {
      if (
        profileButton.current &&
        !profileButton.current.contains(e.target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, []);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const Menu = user ? (
    <ul className="profile-dropdown">
      <li>{user.username}</li>
      <li>
        {user.firstName} {user.lastName}
      </li>
      <li>{user.email}</li>
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
