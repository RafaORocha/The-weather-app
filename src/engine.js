// Separation of concern : a function needs to do some action and do it well
function updateWeather(response) {
// Console the response to have all the data about the city we will search for...
console.log(response.data.temperature.current);
let temperatureElement = document.querySelector("#weather-temperature");
let temperatute = response.data.temperature.current;

 let cityElement = document.querySelector("#weather-app-city");

//we will change this a little bit
//cityElement.innerHTML = searchInput.value;
cityElement.innerHTML = response.data.city;
temperatureElement.innerHTML =  Math.round(temperatute);

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
