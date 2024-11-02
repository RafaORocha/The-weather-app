// Separation of concern : a function needs to do some action and do it well
function updateWeather(response) {
  // Console the response to have all the data about the city we will search for...
  //console.log(response.data.temperature.current);
  let temperatureElement = document.querySelector("#weather-temperature");
  let temperatute = response.data.temperature.current;
  // get data from API to city
  let cityElement = document.querySelector("#weather-app-city");

  // get data from API to weather description
  //console.log(response.data.condition.description);
  let descriptionElement = document.querySelector("#description");

  // get data from API to weather humidity
  //console.log(response.data.temperature.humidity);
  let humidityElement = document.querySelector("#current-humidity");

  // get data from API to weather wind
  //console.log(response.data.wind);
  let windElement = document.querySelector("#current-wind");

  // get data from API to time zone
let timeElement = document.querySelector("#time");
let date = new Date(response.data.time * 1000);

  //cityElement.innerHTML = searchInput.value ---> we will change it a little bit
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperatute);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  //we need to parse the time data
  timeElement.innerHTML = formatDate(date);
}

//let's create a new function to make the time better
function formatDate(date) {
  //let day = date.getDay();
  let hour = date.getHours();
  let minutes = date.getMinutes();
let days = 
["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let day = days 
[date.getDay()];

if (minutes < 10) {
  minutes = `0${minutes}`;
}

return `${day} ${hour}:${minutes}`;
}

function searchCity(city) {
// make the api call and update the interface
let apiKey = "66a6b9f2c3acb0fea40b14354cf8o35t";
let apiUrl =
  `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
//console.log(apiUrl);
// We want to update the value of temperature: we need to make a request through axios to go and take the info from this API
axios.get(apiUrl).then(updateWeather);
}


function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  //console.log(searchInput.value);
//move the cityElement variable to the "updateWeather" function
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
//console.log(searchFormElement);
searchFormElement.addEventListener("submit", handleSearchSubmit);

//we are going to add an "on load" city and when we reload the page will show up a city by default
searchCity("Lisbon");
