import { useState } from "react";

import TypePage from "./Pages/TypePage";
import PlacePage from "./Pages/PlacePage";
import LocationPage from "./Pages/LocationPage/LocationPage";
import ImagesPage from "./Pages/ImagesPage";
import TitlePage from "./Pages/TitlePage";
import DescriptionPage from "./Pages/DescriptionPage/index.jsx";
import PageButtons from "./PageButtons";

import "./NewSpot.css";
import PricePage from "./Pages/PricePage";

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
  const [place, setPlace] = useState(null);
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

  return (
    <div id="new-spot-form">
      <div id="page-layout">
        <div id="pages">
          <TypePage type={type} setType={setType} />
          <PlacePage place={place} setPlace={setPlace} />
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
          <TitlePage type={type} name={name} setName={setName} />
          <DescriptionPage
            description={description}
            setDescription={setDescription}
          />
          <PricePage price={price} setPrice={setPrice} />
        </div>
      </div>
      <PageButtons />
    </div>
  );
}

export default NewSpotForm;
