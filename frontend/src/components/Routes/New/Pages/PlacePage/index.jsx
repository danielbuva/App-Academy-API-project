import PlaceButton from "./PlaceButton ";

import House from "./icons/House.svg";
import Door from "./icons/Door.svg";
import Shared from "./icons/Shared.svg";

import "./PlacePage.css";

function PlacePage({ place, setPlace }) {
  return (
    <div id="place-page">
      <p style={{ fontSize: "30px", fontWeight: 500 }}>
        What type of place will guests have?
      </p>
      <PlaceButton
        place={place}
        setPlace={setPlace}
        main="An entire place"
        sub="Guests have the whole place to themselves."
        icon={<img src={House} alt={House} />}
      />
      <PlaceButton
        place={place}
        setPlace={setPlace}
        main="A room"
        sub="Guests have their own room in a home, plus access to shared
            spaces."
        icon={<img src={Door} alt={Door} />}
      />
      <PlaceButton
        place={place}
        setPlace={setPlace}
        main="A shared room"
        sub="Guests sleep in a room or common area that may be shared with you
            or others."
        icon={<img src={Shared} alt={Shared} />}
      />
    </div>
  );
}

export default PlacePage;
