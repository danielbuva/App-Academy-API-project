import { useState } from "react";

import ChevronLeft from "./ChevronIcons/ChevronLeft";
import ChevronRight from "./ChevronIcons/ChevronRight";

import "./Preview.css";
import { useHistory } from "react-router-dom";

function Preview({ images, id }) {
  const [page, setPage] = useState(0);
  const [leftOpacity, setLeftOpacity] = useState(0);
  const [rightOpacity, setRightOpacity] = useState(0);
  const history = useHistory();

  if (!images || images.length < 1) return null;

  const showButtons = () => {
    if (page > 0) {
      setLeftOpacity(1);
    }
    if (page < images.length - 1) {
      setRightOpacity(1);
    }
  };
  const hideButtons = () => {
    setLeftOpacity(0);
    setRightOpacity(0);
  };
  const pageRight = () => {
    if (page < images.length - 1) {
      setPage(page + 1);
    }
    if (page === images.length - 2) {
      setRightOpacity(0);
    }
    setLeftOpacity(1);
  };
  const pageLeft = () => {
    if (page > 0) {
      setPage(page - 1);
    }
    if (page === 1) {
      setLeftOpacity(0);
    }
    setRightOpacity(1);
  };

  const handleClick = () => {
    history.push(`/spots/${id}`);
  };

  return (
    <div
      id="preview"
      onMouseEnter={showButtons}
      onMouseLeave={hideButtons}
      onClick={handleClick}
    >
      <button
        onClick={pageLeft}
        className="page-button left"
        style={{ opacity: leftOpacity }}
      >
        <ChevronLeft />
      </button>
      <button
        onClick={pageRight}
        className="page-button right"
        style={{ opacity: rightOpacity }}
      >
        <ChevronRight />
      </button>
      <img
        className="preview-image"
        src={images[page]}
        alt={images[page]}
      />
    </div>
  );
}

export default Preview;
