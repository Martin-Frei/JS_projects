const cityInput = document.getElementById("cityInput");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const windSpeed = document.getElementById("windSpeed");
const windDeg = document.getElementById("windDeg");
const weatherDesription = document.getElementById("weatherDescription");

function getInputValue() {
  let cityName = cityInput.value.trim();  
  console.log(cityInput);
    const url = (`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric;`)

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      city.innerHTML = data.name;
      temp.innerHTML = `${data.main.temp} °C`;
      windSpeed.innerHTML = `${data.wind.speed} km/h`;
      windDeg.innerHTML = `${data.wind.deg} °`;
      weatherDesription.innerHTML = `${data.weather[0].description}`;
    })
    .catch((err) => {
      alert("Fehler: " + err.message);
    });

  alert("JS Work");
  }