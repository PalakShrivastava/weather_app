const apiKey = "c203aecc52257505e3bc26c7c0d41154";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const weatherBox = document.getElementById("weatherBox");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") return;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod !== 200) {
        alert("City not found!");
        weatherBox.classList.add("hidden");
        return;
      }

      cityName.textContent = `${data.name}, ${data.sys.country}`;
      temperature.textContent = `🌡️ ${data.main.temp}°C`;
      description.textContent = `📝 ${data.weather[0].description}`;
      const iconCode = data.weather[0].icon;
      weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      weatherBox.classList.remove("hidden");
      cityInput.value = ""; 
    })
    .catch((err) => {
      alert("Something went wrong!");
      console.error(err);
    });
});
