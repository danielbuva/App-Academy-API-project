import React from "react";
import { NavLink } from "react-router-dom";

import ProfileButton from "./ProfileButton";

import "./Nav.css";

function Nav() {
  return (
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Nav;
