import { NavLink } from "react-router-dom";
import "./Nav.css";

function CreateANewSpot() {
  return (
    <NavLink exact to="/spots/new" id="new-spot">
      Create a New Spot
    </NavLink>
  );
}

export default CreateANewSpot;
