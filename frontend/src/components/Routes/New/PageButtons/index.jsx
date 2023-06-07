import "./PageButtons.css";

function PageButtons({
  page,
  setPage,
  type,
  place,
  country,
  address,
  city,
  stateOrTerritory,
  zipcode,
  previewUrl,
  url1,
  url2,
  url3,
  url4,
  name,
  description,
  handleSubmit,
}) {
  const nextPage = () => {
    if (page === 0 && type) {
      setPage(1);
    }
    if (page === 1 && place) {
      setPage(2);
    }
    if (
      page === 2 &&
      country &&
      address &&
      city &&
      stateOrTerritory &&
      zipcode
    ) {
      setPage(3);
    }
    if (page === 3 && previewUrl && url1 && url2 && url3 && url4) {
      setPage(4);
    }
    if (page === 4 && name) {
      setPage(5);
    }
    if (page === 5 && description) {
      setPage(6);
    }
  };
  const prevPage = () => {
    if (page > 0 && page <= 6) {
      setPage(page - 1);
    }
  };

  return (
    <div id="page-buttons">
      <button className="page-buttons back" onClick={prevPage}>
        Back
      </button>
      <button onClick={handleSubmit}>submit</button>
      <button className="page-buttons next" onClick={nextPage}>
        Next
      </button>
    </div>
  );
}

export default PageButtons;
