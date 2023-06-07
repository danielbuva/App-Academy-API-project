import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNewSpot } from "../../../store/spots";

import TypePage from "./Pages/TypePage";
import PlacePage from "./Pages/PlacePage";
import LocationPage from "./Pages/LocationPage/LocationPage";
import ImagesPage from "./Pages/ImagesPage";
import TitlePage from "./Pages/TitlePage";
import DescriptionPage from "./Pages/DescriptionPage/index.jsx";
import PageButtons from "./PageButtons";
import PricePage from "./Pages/PricePage";

import "./NewSpot.css";

function randomDescription() {
  const descriptions = [
    `Get cozy and settle into this rustic space.`,
    `You'll love this unique and romantic escape.`,
    `Reconnect with nature at this unforgettable escape.`,
    `You’ll have plenty to enjoy at this historic place in a picturesque setting.`,
    `Enjoy the sounds of nature when you stay in this unique place.`,
  ];

  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function NewSpotForm() {
  const [type, setType] = useState(null);
  const [place, setPlace] = useState("An entire place");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [city, setCity] = useState("");
  const [stateOrTerritory, setStateOrTerritory] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [url4, setUrl4] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState(randomDescription());
  const [price, setPrice] = useState(52);
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();

  const dataExists =
    address &&
    zipcode &&
    city &&
    stateOrTerritory &&
    country &&
    name &&
    description &&
    place &&
    price &&
    type;

  const pageToRender =
    page === 0 ? (
      <TypePage type={type} setType={setType} />
    ) : page === 1 ? (
      <PlacePage place={place} setPlace={setPlace} />
    ) : page === 2 ? (
      <LocationPage
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
    ) : page === 3 ? (
      <ImagesPage
        type={type}
        previewUrl={previewUrl}
        setPreviewUrl={setPreviewUrl}
        url1={url1}
        setUrl1={setUrl1}
        url2={url2}
        setUrl2={setUrl2}
        url3={url3}
        setUrl3={setUrl3}
        url4={url4}
        setUrl4={setUrl4}
      />
    ) : page === 4 ? (
      <TitlePage type={type} name={name} setName={setName} />
    ) : page === 5 ? (
      <DescriptionPage
        description={description}
        setDescription={setDescription}
      />
    ) : page === 6 ? (
      <PricePage price={price} setPrice={setPrice} />
    ) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dataExists) {
      const spot = await dispatch(
        createNewSpot({
          address: `${address} ${addressNumber ?? ""} ${zipcode}`,
          city,
          state: stateOrTerritory,
          country,
          name,
          description,
          place,
          price,
          type,
        })
      );
      if (spot) history.push(`/spots/${spot.id}`);
    }
  };

  return (
    <div id="new-spot-form">
      <div id="page-layout">
        <div id="pages">{pageToRender}</div>
      </div>
      <PageButtons
        page={page}
        setPage={setPage}
        type={type}
        place={place}
        country={country}
        address={address}
        addressNumber={addressNumber}
        city={city}
        stateOrTerritory={stateOrTerritory}
        zipcode={zipcode}
        previewUrl={previewUrl}
        url1={url1}
        url2={url2}
        url3={url3}
        url4={url4}
        name={name}
        description={description}
        price={price}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default NewSpotForm;
