import React from "react";
import { NavLink } from "react-router-dom";

import ProfileButton from "./ProfileButton";

import "./Nav.css";
import useIsLoaded from "../../hooks/useIsLoaded";
import useSessionUser from "../../hooks/useSessionUser";

function Nav() {
  const currentUser = useSessionUser();
  const isLoaded = useIsLoaded();

  return (
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      <li>{isLoaded && <ProfileButton currentUser={currentUser} />}</li>
    </ul>
  );
}

export default Nav;
