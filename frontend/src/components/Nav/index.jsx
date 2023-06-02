import React from "react";
import { NavLink } from "react-router-dom";

import UserMenu from "./UserMenu";

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
        <UserMenu />
      </li>
    </ul>
  );
}

export default Nav;
