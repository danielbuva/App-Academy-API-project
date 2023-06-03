import React from "react";

import YCSHIYP from "./YCSHIYP";
import UserMenu from "./UserMenu";

import "./Nav.css";

function Nav() {
  return (
    <div className="nav">
      <YCSHIYP />
      <UserMenu />
    </div>
  );
}

export default Nav;
