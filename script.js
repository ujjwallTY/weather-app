const apiKey = "a44f9dd72d894c06ab3182305260507";

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {

    const city = document.getElementById("city").value;

    getWeather(city);

});
document.getElementById("city").addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        getWeather(this.value);
    }
});
const locationBtn = document.getElementById("locationBtn");

locationBtn.addEventListener("click", () => {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
            async (position) => {

                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                getWeather(`${lat},${lon}`);

            },
            () => {

                alert("Unable to get location");

            }
        );

    } else {

        alert("Geolocation is not supported.");

    }

});
async function getWeather(city){

    const weatherDiv = document.getElementById("weather");

    weatherDiv.innerHTML = "<p>Loading...</p>";

    try{

        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

        const response = await fetch(url);

        const data = await response.json();

        if(data.error){
            weatherDiv.innerHTML = `<h3>${data.error.message}</h3>`;
            return;
        }

        weatherDiv.innerHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>

            <img src="https:${data.current.condition.icon}">

            <h1>${data.current.temp_c}°C</h1>

            <p>${data.current.condition.text}</p>

            <hr>

            <p>🌡 Feels Like: ${data.current.feelslike_c}°C</p>

            <p>💧 Humidity: ${data.current.humidity}%</p>

            <p>💨 Wind: ${data.current.wind_kph} km/h</p>

            <p>☁ Cloud: ${data.current.cloud}%</p>

            <p>🕒 Local Time: ${data.location.localtime}</p>
        `;

    }catch(error){

        weatherDiv.innerHTML = "<h3>Something went wrong.</h3>";

    }

}