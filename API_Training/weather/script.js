// DOM-Elemente
const cityInput = document.getElementById("cityInput");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const windSpeed = document.getElementById("windSpeed");
const windDeg = document.getElementById("windDeg");
const weatherDescription = document.getElementById("weatherDescription");
const errorMessage = document.getElementById("errorMessage");
const submitBtn = document.getElementById("submitBtn");

// Enter-Taste Unterstützung
cityInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    getInputValue();
  }
});

// Hilfsfunktionen
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

function hideError() {
  errorMessage.style.display = "none";
}

function setLoadingState(isLoading) {
  submitBtn.disabled = isLoading;
  submitBtn.textContent = isLoading ? "Laden..." : "Suchen";
}

function getWindDirection(degrees) {
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

// Hauptfunktion
function getInputValue() {
  let cityName = cityInput.value.trim();
  
  // Eingabevalidierung
  if (!cityName) {
    showError("Bitte geben Sie einen Stadtnamen ein");
    return;
  }

  hideError();
  setLoadingState(true);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric&lang=de`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Stadt "${cityName}" nicht gefunden`);
      }
      return response.json();
    })
    .then((data) => {
      // Daten anzeigen
      city.textContent = data.name + ", " + data.sys.country;
      temp.textContent = `${Math.round(data.main.temp)}°C (gefühlt ${Math.round(data.main.feels_like)}°C)`;
      
      // Windgeschwindigkeit von m/s in km/h umrechnen
      const windSpeedKmh = (data.wind.speed * 3.6).toFixed(1);
      windSpeed.textContent = `${windSpeedKmh} km/h`;
      
      // Windrichtung mit Kompassrichtung
      const windDirection = getWindDirection(data.wind.deg);
      windDeg.textContent = `${data.wind.deg}° (${windDirection})`;
      
      // Wetterbeschreibung
      weatherDescription.textContent = data.weather[0].description;
      
      // Eingabefeld leeren
      cityInput.value = "";
    })
    .catch((error) => {
      showError(error.message);
      console.error("Error:", error);
    })
    .finally(() => {
      setLoadingState(false);
    });
}