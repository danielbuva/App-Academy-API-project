import ProfileIcon from "./ProfileIcon.svg";

import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import * as sessionActions from "../../../store/session";

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

  return (
    <>
      <div
        style={{ width: "35px", height: "35px", cursor: "pointer" }}
        onClick={() => setShow(!show)}
        ref={profileButton}
      >
        <img src={ProfileIcon} alt="Profile" />
      </div>

      {show && (
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
      )}
    </>
  );
}

export default ProfileButton;
