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
        width: "98vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        zIndex: 1,
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
