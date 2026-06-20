async function getData() {
    const cityName = document.getElementById("cityInput").value;
    if (!cityName.trim()) return;

    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=ca018df54353f065aaed7d802825b8be`)
    .then(res => res.json())
    .then(data => renderData(data))
}

function renderData(data) {
    if (data.cod !== 200) {
        document.getElementById("result").innerHTML = `
            <div class="error"> City not found. Please try again!!!!.</div>
        `;
        return;
    }

    document.getElementById("result").innerHTML = `
        <div class="card">
            <div class="card-top">
                <div class="location">
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p>${data.weather[0].description}</p>
                </div>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon">
            </div>

            <div class="temperature">${Math.round(data.main.temp)}<sup>°C</sup></div>
            <p class="feels-like">Feels like ${Math.round(data.main.feels_like)}°C</p>

            <div class="divider"></div>

            <div class="stats">
                <div class="stat">
                    <i class="fa-solid fa-droplet"></i>
                    <span class="val">${data.main.humidity}%</span>
                    <span class="lbl">Humidity</span>
                </div>
                <div class="stat">
                    <i class="fa-solid fa-wind"></i>
                    <span class="val">${data.wind.speed} m/s</span>
                    <span class="lbl">Wind</span>
                </div>
                <div class="stat">
                    <i class="fa-solid fa-gauge"></i>
                    <span class="val">${data.main.pressure}</span>
                    <span class="lbl">Pressure</span>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cityInput').addEventListener('keydown', e => {
        if (e.key === 'Enter') getData();
    });
});