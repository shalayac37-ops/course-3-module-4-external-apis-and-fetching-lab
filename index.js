// Weather API
const weatherApi = "https://api.weather.gov/alerts/active?area=";

// Fetch weather alerts
function fetchWeatherAlerts(state) {
  return fetch(`${weatherApi}${state}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unable to fetch weather alerts");
      }

      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayAlerts(data);
      return data;
    })
    .catch((error) => {
      console.log(error.message);

      const errorMessage = document.getElementById("error-message");
      errorMessage.textContent = error.message;
      errorMessage.classList.remove("hidden");
    });
}

// Display weather alerts
function displayAlerts(data) {
  const alertsDisplay = document.getElementById("alerts-display");
  const errorMessage = document.getElementById("error-message");

  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");

  alertsDisplay.innerHTML = "";

  const summary = document.createElement("p");
  summary.textContent = `${data.title}: ${data.features.length}`;
  alertsDisplay.appendChild(summary);

  const list = document.createElement("ul");

  data.features.forEach((alert) => {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    list.appendChild(li);
  });

  alertsDisplay.appendChild(list);
}

// Set up event listeners
function setupEventListeners() {
  const button = document.getElementById("fetch-alerts");
  const input = document.getElementById("state-input");

  button.addEventListener("click", () => {
    const state = input.value.trim().toUpperCase();

    if (!state) {
      const errorMessage = document.getElementById("error-message");
      errorMessage.textContent = "Please enter a state abbreviation";
      errorMessage.classList.remove("hidden");
      return;
    }

    fetchWeatherAlerts(state);
    input.value = "";
  });
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", setupEventListeners);
}

module.exports = {
  fetchWeatherAlerts,
  displayAlerts,
  setupEventListeners,
};