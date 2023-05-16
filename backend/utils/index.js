const today = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};



/*
fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `TJR5rIy6-5C2eKkLKkxM-iehifYyLgwiQUl8`,
  },
  body: JSON.stringify({
    firstName: "dani",
    lastName: "buva",
    username: "dani",
    email: "daniel.valdecantos@gmail.com",
    password: "696969",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
*/
module.exports = { today };
