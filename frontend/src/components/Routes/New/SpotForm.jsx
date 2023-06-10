import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { createNewSpot, updateSpot } from "../../../store/spots";

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
    `You'll have plenty to enjoy at this historic place in a picturesque setting.`,
    `Enjoy the sounds of nature when you stay in this unique place.`,
  ];

  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function SpotForm() {
  const history = useHistory();

  const location = useLocation();
  const initialState = location.state;

  const {
    id,
    initialType,
    initialPlace,
    initialCountry,
    initialAddress,
    initialAddressNumber,
    initialCity,
    initialStateOrTerritory,
    initialZipcode,
    initialName,
    initialDescription,
    initialPrice,
  } = initialState ?? {};

  const isUpdating = !!initialType;

  const [type, setType] = useState(initialType ?? null);
  const [place, setPlace] = useState(initialPlace ?? "An entire place");
  const [country, setCountry] = useState(initialCountry ?? "");
  const [address, setAddress] = useState(initialAddress ?? "");
  const [addressNumber, setAddressNumber] = useState(
    initialAddressNumber ?? ""
  );
  const [city, setCity] = useState(initialCity ?? "");
  const [stateOrTerritory, setStateOrTerritory] = useState(
    initialStateOrTerritory ?? ""
  );
  const [zipcode, setZipcode] = useState(initialZipcode ?? "");
  const [previewUrl, setPreviewUrl] = useState("");
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [url4, setUrl4] = useState("");
  const [name, setName] = useState(initialName ?? "");
  const [description, setDescription] = useState(
    initialDescription ?? randomDescription()
  );
  const [price, setPrice] = useState(initialPrice ?? 52);
  const [page, setPage] = useState(0);
  const [isAnyStateSet, setIsAnyStateSet] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const updateState = (setState, initialValue) => (newValue) => {
    if (!isAnyStateSet && newValue !== initialValue) {
      setIsAnyStateSet(true);
    }
    setState(newValue);
  };

  const setType1 = updateState(setType, initialType ?? null);
  const setPlace1 = updateState(
    setPlace,
    initialPlace ?? "An entire place"
  );
  const setCountry1 = updateState(setCountry, initialCountry ?? null);
  const setAddress1 = updateState(setAddress, initialAddress ?? "");
  const setAddressNumber1 = updateState(
    setAddressNumber,
    initialAddressNumber ?? ""
  );
  const setCity1 = updateState(setCity, initialCity ?? "");
  const setStateOrTerritory1 = updateState(
    setStateOrTerritory,
    initialStateOrTerritory ?? null
  );
  const setZipcode1 = updateState(setZipcode, initialZipcode ?? "");
  const setName1 = updateState(setName, initialName ?? "");
  const setDescription1 = updateState(
    setDescription,
    initialDescription ?? ""
  );
  const setPrice1 = updateState(setPrice, initialPrice ?? 52);

  const pageToRender =
    page === 0 ? (
      <TypePage type={type} setType={setType1} />
    ) : page === 1 ? (
      <PlacePage place={place} setPlace={setPlace1} />
    ) : page === 2 ? (
      <LocationPage
        errors={errors}
        country={country}
        setCountry={setCountry1}
        address={address}
        setAddress={setAddress1}
        addressNumber={addressNumber}
        setAddressNumber={setAddressNumber1}
        city={city}
        setCity={setCity1}
        stateOrTerritory={stateOrTerritory}
        setStateOrTerritory={setStateOrTerritory1}
        zipcode={zipcode}
        setZipcode={setZipcode1}
      />
    ) : page === 3 ? (
      <ImagesPage
        errors={errors}
        setErrors={setErrors}
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
      <TitlePage
        type={type}
        name={name}
        setName={setName1}
        errors={errors}
      />
    ) : page === 5 ? (
      <DescriptionPage
        errors={errors}
        description={description}
        setDescription={setDescription1}
      />
    ) : page === 6 ? (
      <PricePage price={price} setPrice={setPrice1} />
    ) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataExists = isUpdating
      ? address &&
        zipcode &&
        city &&
        stateOrTerritory &&
        country &&
        name &&
        description &&
        place &&
        price &&
        type
      : address &&
        zipcode &&
        city &&
        stateOrTerritory &&
        country &&
        name &&
        description &&
        place &&
        previewUrl &&
        price &&
        type;

    if (price && (price < 10 || price > 10000)) {
      setErrors({ price: "Price must be between $10 and $10,000" });
    }
    if (dataExists && (price > 10 || price < 10000)) {
      const imageData = [
        { url: previewUrl },
        { url: url1 },
        { url: url2 },
        { url: url3 },
        { url: url4 },
      ];
      const spotData = {
        address,
        addressNumber,
        city,
        state: stateOrTerritory,
        country,
        name,
        description,
        place,
        price,
        type,
        zipcode,
      };

      if (!isUpdating) {
        dispatch(createNewSpot(spotData, imageData)).then((id) =>
          history.push(`/spots/${id}`)
        );
      } else if (isAnyStateSet) {
        dispatch(updateSpot(spotData, imageData, id)).then(() =>
          history.push(`/spots/${id}`)
        );
      } else history.push(`/spots/${id}`);
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
        name={name}
        description={description}
        price={price}
        handleSubmit={handleSubmit}
        isUpdating={isUpdating}
        isAnyStateSet={isAnyStateSet}
        setErrors={setErrors}
        url1={url1}
        url2={url2}
        url3={url3}
        url4={url4}
      />
    </div>
  );
}

export default SpotForm;
