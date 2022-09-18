
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

function showTemperature(response) {
    let temperature = document.getElementById("temperature");
    let temp = Math.round(response.data.main.temp);
    let descriptionElement = document.getElementById("weather-description");
    let humidityElement = document.getElementById("humidity");
    let windElement = document.getElementById("wind");
    let city = document.querySelector('#city');
    
    
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    temperature.innerHTML = `${temp}`;
    city.innerHTML = response.data.name;
};

function search(city){
    let apiKey = "e8690fee550e3cce67ea38c5d2186819";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showTemperature);
};

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("search-text-input");
  search(cityInputElement.value);
};
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#searchbar");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Oslo");


