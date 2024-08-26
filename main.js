const cityInbut = document.querySelector(".inputText");

const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
  const cityName = cityInbut.value;
  getData(cityName);
});

function getData(name) {
  const API = "7225b79edf47f9278f3e2b823dfa04a1";
  const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API}&units=metric&lang=tr`;
  fetch(baseURL)
    .then((res) => res.json())
    .then((data) => {
      const {
        name,
        sys: { country },
        main: { temp, feels_like, humidity },
        weather: [{ description }],
        wind: { speed },
      } = data;

      const city = document.querySelector(".city");
      const temperature = document.querySelector(".temp");
      const hum = document.querySelector(".humidity");
      const wind = document.querySelector(".wind");
      const weatherDesc = document.querySelector(".weather");
      const feeling = document.querySelector(".feeling");

      city.textContent = `${name}, ${country}`;
      temperature.innerText = `${temp} °`;
      hum.textContent = `Nem:%${humidity}`;
      wind.textContent = `Rüzgar:${speed}km/s`;
      weatherDesc.innerHTML = `<i>${description}</i>`;
      feeling.textContent = `Hissedilen:${feels_like}`;

      const body = document.querySelector("body");
      body.classList.remove("rainy", "cloudy", "snowy", "clear");

      if (description.includes("yağmur")) {
        body.classList.add("rainy");
      } else if (description.includes("kapalı")) {
        body.classList.add("cloudy");
      } else if (description.includes("kar")) {
        body.classList.add("snowy");
      } else if (description.includes("sisli")) {
        body.classList.add("foggy");
      } else {
        body.classList.add("sunny"); // Diğer durumlar için
      }
    })
    .catch((err) => console.log(err));

  cityInbut.value = "";
  cityInbut.focus();
}
