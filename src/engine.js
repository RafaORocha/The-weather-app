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

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperatute);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);

  getForecast(response.data.city);
}

function formatDate(date) {
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

function getForecast (city) {
let apiKey = "66a6b9f2c3acb0fea40b14354cf8o35t";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
//console.log(apiUrl);
}

function displayForecast(response) {
console.log(response.data);
  let forecastHtml = "";

  response.data.daily.forEach(function (day) {
    forecastHtml +=
      `<div class="weather-forecast-day"> 
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <div>
            <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
            </div>
          <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}°</strong>
              </div>
            <div class="weather-forecast-temperature">${Math.round(
              day.temperature.minimum
            )}°</div>
          </div>
         </div>
         `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function formatDay (timestamp) {
let date = new Date(timestamp * 1000);
let days = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];

return days[date.getDay()];
}

let searchFormElement = document.querySelector("#search-form");
//console.log(searchFormElement);
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Lisbon");

