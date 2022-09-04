
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
    temperature.innerHTML = `${temp}˚`;
  };

function search(event){
    event.preventDefault();
    let searchInput = document.querySelector('#search-text-input');
    let city = document.querySelector('#city');
    city.innerHTML = `${searchInput.value}`;
    let apiKey = "e8690fee550e3cce67ea38c5d2186819";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showTemperature);
};
let form = document.querySelector('#searchbar');

form.addEventListener("submit", search);






