import React from "react";

import YCSHIYP from "./YCSHIYP";
import UserMenu from "./UserMenu";

import "./Nav.css";
import Divider from "../Divider";

function Nav() {
  return (
    <div
      style={{
        marginBottom: "30px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="nav">
        <YCSHIYP />
        <UserMenu />
      </div>
      <Divider width="99vw" alignSelf="center" />
    </div>
  );
}

export default Nav;
