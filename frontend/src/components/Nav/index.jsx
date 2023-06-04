import React from "react";

import YCSHIYP from "./YCSHIYP";
import UserMenu from "./UserMenu";

import "./Nav.css";
import Divider from "../Divider";

function Nav() {
  return (
    <>
      <div className="nav">
        <YCSHIYP />
        <UserMenu />
      </div>
      <Divider />
    </>
  );
}

export default Nav;
