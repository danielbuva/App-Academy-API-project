import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfileButton from "./ProfileButton";

import "./Nav.css";
import useIsLoaded from "../../hooks/useIsLoaded";

function Nav() {
  const sessionUser = useSelector((state) => state.session.user);
  const isLoaded = useIsLoaded();

  return (
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      <li>{isLoaded && <ProfileButton user={sessionUser} />}</li>
    </ul>
  );
}

export default Nav;
