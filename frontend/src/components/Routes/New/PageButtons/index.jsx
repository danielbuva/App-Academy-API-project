import "./PageButtons.css";

function PageButtons({
  page,
  setPage,
  type,
  place,
  price,
  country,
  address,
  city,
  stateOrTerritory,
  zipcode,
  previewUrl,
  name,
  description,
  handleSubmit,
  isUpdating,
  isAnyStateSet,
  setErrors,
  url1,
  url2,
  url3,
  url4,
}) {
  const urlIsValid = (inputUrl) => {
    try {
      new URL(inputUrl);
      return true;
    } catch (error) {
      return false;
    }
  };

  const nextPage = () => {
    setErrors({});

    const validLocationData =
      country && address && city && stateOrTerritory && zipcode;

    switch (page) {
      case 0:
        if (type) setPage(1);
        break;
      case 1:
        if (place) setPage(2);
        break;
      case 2:
        if (validLocationData && isUpdating) {
          setPage(4);
        } else if (validLocationData) {
          setPage(3);
        } else {
          if (!country)
            setErrors((prevErrors) => ({
              ...prevErrors,
              country: "Country is required",
            }));
          if (!address)
            setErrors((prevErrors) => ({
              ...prevErrors,
              address: "Address is required",
            }));
          if (!city)
            setErrors((prevErrors) => ({
              ...prevErrors,
              city: "City is required",
            }));
          if (!stateOrTerritory)
            setErrors((prevErrors) => ({
              ...prevErrors,
              state: "State or territory is required",
            }));
          if (!zipcode)
            setErrors((prevErrors) => ({
              ...prevErrors,
              zipcode: "Zipcode is required",
            }));
        }
        break;
      case 3:
        if (previewUrl && !urlIsValid(previewUrl)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            previewUrl: "Preview url is an valid url",
          }));
        }
        if (url1 && !urlIsValid(url1)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            url1: "Image url one is an invalid url",
          }));
        }
        if (url2 && !urlIsValid(url2)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            url2: "Image url two is an invalid url",
          }));
        }
        if (url3 && !urlIsValid(url3)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            url3: "Image url three is an invalid url",
          }));
        }
        if (url4 && !urlIsValid(url4)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            url4: "Image url four is an invalid url",
          }));
        }
        if (previewUrl) {
          setErrors((prevErrors) => {
            if (Object.keys(prevErrors).length === 0) {
              setPage(4);
            }
            return prevErrors;
          });
        } else {
          setErrors({ previewUrl: "Preview URL is required" });
        }
        break;
      case 4:
        if (name && name.length < 51) {
          setPage(5);
        } else if (!name) {
          setErrors({ title: "Title is required" });
        } else if (name.length > 51) {
          setErrors({ title: "Title must be less than 32 characters" });
        }
        break;
      case 5:
        if (description && description.length < 501) {
          setPage(6);
        } else if (!description) {
          setErrors({ description: "Description is required" });
        } else if (description.length > 500) {
          setErrors({
            description: "Description must be less than 500 characters",
          });
        }
        break;
      default:
        return;
    }
  };

  const prevPage = () => {
    setErrors({});
    if (isUpdating && page === 4) {
      setPage(2);
    } else if (page > 0 && page <= 6) {
      setPage(page - 1);
    }
  };

  const finishButtonText = isUpdating
    ? isAnyStateSet
      ? "Update"
      : "Cancel"
    : "Publish";

  const buttonRight =
    page === 6 ? (
      <button
        onClick={handleSubmit}
        className="spot-button"
        disabled={price < 10 || price > 10000}
      >
        {finishButtonText}
      </button>
    ) : (
      <button className="page-buttons next" onClick={nextPage}>
        Next
      </button>
    );

  return (
    <div id="page-buttons">
      <button className="page-buttons back" onClick={prevPage}>
        Back
      </button>

      {buttonRight}
    </div>
  );
}

export default PageButtons;
