const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const resultDiv = document.getElementById('weatherResult');
const API_KEY = 'vhgCtCsPyXrn9ooZb27ZCg==sDgHjC31TpRdgcJf'; // Your ApiNinjas API Key

// Fetch & display last searched city on load
window.onload = async () => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        cityInput.value = lastCity;
        await fetchWeather(lastCity);
    }
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    await fetchWeather(city);
    localStorage.setItem('lastCity', city);
});

async function fetchWeather(city) {
    resultDiv.textContent = 'Loading...';
    try {
        const url = `https://api.api-ninjas.com/v1/weather?city=${encodeURIComponent(city)}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'X-Api-Key': API_KEY }
        });
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        displayWeather(data);
    } catch (err) {
        showError(err.message || 'Error fetching weather');
    }
}

function displayWeather(data) {
    resultDiv.innerHTML = `
        <div class="success">
            Weather in <b>${cityInput.value}</b>:<br>
            Conditions: ${data.cloud_pct} % cloud coverage<br>
            Temperature: ${data.temp} °C <br>
            Feels Like: ${data.feels_like} °C<br>
            Humidity: ${data.humidity} %<br>
            Wind Speed: ${data.wind_speed} m/s
        </div>
    `;
}

function showError(msg) {
    resultDiv.innerHTML = `<span class="error">${msg}</span>`;
}
