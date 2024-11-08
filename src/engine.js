function updateWeather(response) {
  //console.log(response.data.temperature.current);
  let temperatureElement = document.querySelector("#weather-temperature");
  let temperatute = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-app-city");

  //console.log(response.data.condition.description);
  let descriptionElement = document.querySelector("#description");

  //console.log(response.data.temperature.humidity);
  let humidityElement = document.querySelector("#current-humidity");

  //console.log(response.data.wind);
  let windElement = document.querySelector("#current-wind");

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  let iconElement = document.querySelector("#weather-icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  //cityElement.innerHTML = searchInput.value ---> we will change it a little bit
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperatute);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  //we need to parse the time data
  timeElement.innerHTML = formatDate(date);

  //we should to call the function "getForecast" right after called the function "updateWeather"
  getForecast(response.data.city);
}

function formatDate(date) {
  //let day = date.getDay();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "66a6b9f2c3acb0fea40b14354cf8o35t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  //console.log(searchInput.value);
  searchCity(searchInput.value);
}

//We will build a function to get the forecast data
function getForecast (city) {
let apiKey = "66a6b9f2c3acb0fea40b14354cf8o35t";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
//console.log(apiUrl);
}

//this function will receive a response
function displayForecast(response) {
//console.log(response.data);

  //we will create an array of days to loop through it
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  //we have to concatenate a string, a massive string and we will have all the days in it.
  let forecastHtml = "";

  //it will loop through each day (inside the array) one at a time
  days.forEach(function (day) {
    forecastHtml +=
    // forecastHtml +
      `<div class="weather-forecast-day"> 
            <div class="weather-forecast-date">${day}</div>
            <div class="weather-forecast-icon">🌤️</div>
          <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
              <strong>15°</strong>
              </div>
            <div class="weather-forecast-temperature">9°</div>
          </div>
         </div>
         `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
//console.log(searchFormElement);
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Lisbon");

//we shouldn't call this function here!
//getForecast("Paris");

//we do not need to call this function again, because the function "getForecast" will call it already
//displayForecast();
