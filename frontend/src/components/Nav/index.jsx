import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import OpenModalButton from "../Modal/OpenModalButton";
import ProfileButton from "./ProfileButton";
import SignUpForm from "../SignUpForm";
import LoginForm from "../LoginForm";

import "./Nav.css";

function Nav({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const sessionLinks = sessionUser ? (
    <li>
      <ProfileButton user={sessionUser} />
    </li>
  ) : (
    <li>
      <OpenModalButton text="Log In" content={<LoginForm />} />
      <OpenModalButton text="Sign Up" content={<SignUpForm />} />
    </li>
  );

  return (
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Nav;
