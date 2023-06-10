import LocationForm from "./LocationForm";
import FormError from "../../../../Forms/FormError";

import "./LocationPage.css";

function LocationPage({
  errors,
  country,
  setCountry,
  address,
  setAddress,
  addressNumber,
  setAddressNumber,
  city,
  setCity,
  stateOrTerritory,
  setStateOrTerritory,
  zipcode,
  setZipcode,
}) {
  console.log({ errors });
  return (
    <div id="location-page">
      <p style={{ fontSize: "30px", fontWeight: 500, marginTop: 0 }}>
        Where is your place located?
      </p>
      <p>
        Your address is only shared with guests after they've made a
        reservation.
      </p>
      <LocationForm
        country={country}
        setCountry={setCountry}
        address={address}
        setAddress={setAddress}
        addressNumber={addressNumber}
        setAddressNumber={setAddressNumber}
        city={city}
        setCity={setCity}
        stateOrTerritory={stateOrTerritory}
        setStateOrTerritory={setStateOrTerritory}
        zipcode={zipcode}
        setZipcode={setZipcode}
      />
      <FormError errors={errors} />
    </div>
  );
}

export default LocationPage;
