import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfileButton from "./ProfileButton";

import "./Nav.css";

function Nav({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

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
