
    let currentDate = document.getElementById('currentDate');
 

    let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let currentDay = days[date.getDay()];
   

currentDate.innerHTML = `${currentDay}, ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
};

function displayForecast(response){
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
  forecastHTML = forecastHTML +`
  <div class="col-2">
            <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
            <img
               src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
               alt=""
               width="42"
            />
            <div class="weather-forecast-temperatures">
                <span class="max-temperature">${Math.round(forecastDay.temp.max)}˚</span>
                <span class="min-temperature">${Math.round(forecastDay.temp.min)}˚</span>
            </div>
         </div>`;
  }
});
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

};

function getForecast(coordinates) {
  let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
};

function showTemperature(response) {
    let temperature = document.getElementById("temperature");
    let temp = Math.round(response.data.main.temp);
    let descriptionElement = document.getElementById("weather-description");
    let humidityElement = document.getElementById("humidity");
    let windElement = document.getElementById("wind");
    let city = document.querySelector('#city');
    let iconElement = document.querySelector("#icon");
    
    iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    temperature.innerHTML = `${temp}`;
    city.innerHTML = response.data.name;

    getForecast(response.data.coord);
};

function search(city){
    let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showTemperature);
};

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-text-input");
  search(cityInputElement.value);
};


function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


let form = document.querySelector("#searchbar");
form.addEventListener("submit", handleSubmit);


search("Oslo");

