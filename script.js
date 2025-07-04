const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

//async,await 

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = cityInput.value.trim();
  if (!city) return;

  weatherResult.innerHTML = "<p>Loading...</p>";

  const apiKey = ""; // replace with your API key( took form  OpenWeatherMap )
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");  //try catch block

    const data = await response.json();

    const { name, sys, main, weather } = data;
    const icon = weather[0].icon;

    weatherResult.innerHTML = `
      <h2>${name}, ${sys.country}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">
      <p><strong>${main.temp}°C</strong></p>
      <p>${weather[0].description}</p>
    `;
  } catch (err) {
    weatherResult.innerHTML = `<p>${err.message}</p>`;
  }
});
