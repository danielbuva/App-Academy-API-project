function getMonthYear(date) {
  const dateObj = new Date(date);
  return `${dateObj.toLocaleString("default", {
    month: "long",
  })} ${dateObj.getFullYear()}`;
}

function Review({ name, date, review }) {
  const monthYear = getMonthYear(date);

  return (
    <div>
      <p>{name}</p>
      <p>{monthYear}</p>
      <p>{review}</p>
    </div>
  );
}

export default Review;
