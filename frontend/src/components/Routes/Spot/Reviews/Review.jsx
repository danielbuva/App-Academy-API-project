function getMonthYear(date) {
  const dateObj = new Date(date);
  return `${dateObj.toLocaleString("default", {
    month: "long",
  })} ${dateObj.getFullYear()}`;
}

function Review({ name, date, review }) {
  const monthYear = getMonthYear(date);

  return (
    <div className="review">
      <div className="review-content">
        <p style={{ fontWeight: 600, marginBottom: 0 }}>{name}</p>
        <p style={{ marginTop: 0 }}> {monthYear}</p>
        <p>{review}</p>
      </div>
    </div>
  );
}

export default Review;
