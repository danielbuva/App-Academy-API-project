import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import * as sessionActions from "../../store/session";
import "./Nav.css";

function Nav({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const sessionLinks = sessionUser ? (
    <li>
      <ProfileButton user={sessionUser} />
      <button onClick={logout}>Log Out</button>
    </li>
  ) : (
    <li>
      <NavLink to="/login">Log In</NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
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
