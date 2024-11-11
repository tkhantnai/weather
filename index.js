const form = document.querySelector(".form");
const inputCity = document.querySelector(".inputCity");
const getWeather = document.querySelector(".getWeather");
const apiKey = "322dc884c8f2bed5a529c83ce4713830";
const card = document.querySelector(".card");

form.addEventListener("submit",async event => {
    event.preventDefault();
    const city = inputCity.value;
    if (city) {
        try {
            const weatherData = await fetchweatherData(city);
            displayWeather(weatherData);
        }
        catch (error) {
            console.log(error);
            displayError(error);
        }
    }
    else {
        displayError("Please Enter a city name");
    }
});

async function fetchweatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    // console.log(response);
    if (!response.ok) {
        throw new Error(`No such city as ${inputCity.value}`);
    } return await response.json();
}

function displayWeather(data) {
    console.log(data);
    const { name: city, main: {temp, humidity}, weather: [{description , id}] } = data;
    card.textContent = "";
    card.style.display = "flex";

    const cityName = document.createElement("h1");
    cityName.textContent = city;
    card.appendChild(cityName);
    cityName.classList.add("cityName");

    const temperature = document.createElement("p");
    temperature.textContent = `${(temp - 273).toFixed(1)}°C`;
    card.appendChild(temperature);
    temperature.classList.add("temperature");

    const humidityDisplay = document.createElement("p");
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    card.appendChild(humidityDisplay);
    humidityDisplay.classList.add("humidityDisplay");

    const desc = document.createElement("p");
    desc.textContent = description;
    card.appendChild(desc);
    desc.classList.add("desc");

   const weatherEmoji = document.createElement("p");
    weatherEmoji.textContent = emojiDisplay(id);
    card.appendChild(weatherEmoji);
    weatherEmoji.classList.add("emoji");
}

function displayError(message) {
    const errorDisplay = document.createElement("errorMessage");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorMessage");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}

function emojiDisplay(weatherID) {
    switch (true) {
        case (weatherID >= 200 && weatherID < 300):
            return "⛈️";
        case (weatherID >= 300 && weatherID < 400):
            return "🌧️";
        case (weatherID >= 500 && weatherID < 600):
            return "🌧";
        case (weatherID >= 600 && weatherID < 700):
            return "🌦️";
        case (weatherID >= 700 && weatherID < 800):
            return "❄️";
        case (weatherID === 800):
            return "☀️";
        case (weatherID >= 801 && weatherID < 810):
            return "☁️";
        default:
            return "";

    }
}