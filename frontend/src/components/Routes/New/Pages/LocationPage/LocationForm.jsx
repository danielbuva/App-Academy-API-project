function LocationForm({
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
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} id="location-form">
      <label htmlFor="country-or-region" className="hidden-label" />
      <input
        id="country"
        className="top-input"
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
        placeholder="Country / Region"
      />
      <label htmlFor="address" className="hidden-label" />
      <input
        id="address"
        className="middle-input"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
        placeholder="Street address"
      />
      <label htmlFor="apt-suite-etc" className="hidden-label" />
      <input
        id="apt-suite-etc"
        className="middle-input"
        type="text"
        value={addressNumber}
        onChange={(e) => setAddressNumber(e.target.value)}
        required
        placeholder="Apt, suite, etc. (if applicable)"
      />
      <label htmlFor="City" className="hidden-label" />
      <input
        id="City"
        className="middle-input"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        placeholder="City"
      />
      <label htmlFor="State-or-territory" className="hidden-label" />
      <input
        id="State-or-territory"
        className="middle-input"
        type="text"
        value={stateOrTerritory}
        onChange={(e) => setStateOrTerritory(e.target.value)}
        required
        placeholder="State / territory"
      />
      <label htmlFor="zip-code" className="hidden-label" />
      <input
        id="zip-code"
        className="bottom-input"
        type="text"
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
        required
        placeholder="ZIP code"
      />
    </form>
  );
}

export default LocationForm;
