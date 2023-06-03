import YCSHIYPLogo from "./YCSHIYPLogo.png";
import { NavLink } from "react-router-dom";

import "./ycshiyp.css"

function YCSHIYP() {
  return (
    <NavLink exact to="/" className="ycshiyp">
      <img src={YCSHIYPLogo} alt="YCSHIYP logo" />
      YCSHIYP
    </NavLink>
  );
}

export default YCSHIYP;
