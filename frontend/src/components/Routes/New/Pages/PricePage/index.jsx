import "./PricePage.css";

import Minus from "./icons/Minus.svg";
import Plus from "./icons/Plus.svg";

function PricePage({ price, setPrice }) {
  const incrementPrice = () => {
    if (price < 10) {
      setPrice(10);
    } else if (price <= 9995) {
      setPrice(price + 5);
    } else if (price > 9995) {
      setPrice(10000);
    }
  };

  const decrementPrice = () => {
    if (price > 10000) {
      setPrice(10000);
    } else if (price >= 15) {
      setPrice(price - 5);
    } else if (price > 10) {
      setPrice(10);
    }
  };

  return (
    <div id="price-page">
      <p style={{ fontSize: "30px", fontWeight: 500 }}>
        Now, set your price
      </p>
      <p>You can change it anytime.</p>
      <div id="price-container">
        <button
          onClick={decrementPrice}
          className="price-button decrement"
          disabled={price <= 10}
        >
          <img
            src={Minus}
            alt="lower-price"
            className="price-button-icon"
          />
        </button>
        <div id="input-div">
          <input
            type="text"
            id="price-input"
            value={price === null ? "" : `$${price}`}
            onChange={(e) => {
              const numTargetValue = parseFloat(
                e.target.value.replace(/[^0-9.]/g, "")
              );
              setPrice(isNaN(numTargetValue) ? null : numTargetValue);
            }}
            style={{
              border:
                price >= 10 && price <= 10000
                  ? "solid 1px #696969"
                  : "solid 1px #C33E1F",
            }}
          />
          <p>per night</p>
          <p
            style={{
              color: "#C33E1F",
              fontSize: "12px",
              opacity: price >= 10 && price <= 10000 ? 0 : 1,
            }}
          >
            Enter a price between $10 and $10,000.
          </p>
        </div>

        <button
          onClick={incrementPrice}
          className="price-button increment"
        >
          <img
            src={Plus}
            alt="raise-price"
            className="price-button-icon"
          />
        </button>
      </div>
    </div>
  );
}

export default PricePage;
