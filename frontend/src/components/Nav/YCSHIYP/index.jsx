import ycshiyp from "./ycshiyp.svg";
import { NavLink } from "react-router-dom";

import "./ycshiyp.css";

function YCSHIYP() {
  return (
    <NavLink exact to="/" className="ycshiyp">
      <img src={ycshiyp} alt="YCSHIYP logo" />
    </NavLink>
  );
}

export default YCSHIYP;
