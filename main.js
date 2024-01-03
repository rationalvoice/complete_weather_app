const apiKey = '9707c9883adc47d89e685936240301';
const form = document.querySelector ("#form");
const input = document.querySelector ("#inputCity");
const header = document.querySelector ('.header');

form.onsubmit = function (e) {
    e.preventDefault ();
    let city = input.value.trim ();
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    fetch(url)
    .then((response) => {
        return response.json();
    }).then((data) => {

        console.log(data);

        if (data.error) {
            const delWeatherCard = document.querySelector('.WeatherCard');
            if (delWeatherCard) delWeatherCard.remove();
            const prevWeatherStatus = document.querySelector('.WeatherStatus');
            if (prevWeatherStatus) prevWeatherStatus.remove();
            const window = `<div class="WeatherCard">${data.error.message}</div>`
            header.insertAdjacentHTML('afterend', window);
        }
        else{
            const prevWeatherStatus = document.querySelector('.WeatherStatus');
            if (prevWeatherStatus) prevWeatherStatus.remove();
            const delWeatherCard = document.querySelector('.WeatherCard');
            if (delWeatherCard) delWeatherCard.remove();
            const html = `<div class="WeatherStatus">
            <div class="WeatherCard">
                <div class="CityName">${data.location.name}</div>
                <div class="CityImg"><img class="img" src="./weather icons/cloudy-havyrain_icon-icons.com_65781.svg" alt=""></div>
            </div>
            <div class="weather_info">
                <div class="weatherTime">${data.location.localtime}</div>
                <div class="weatherState">${data.current.condition.text}</div>
                <div class="weatherDegree">${data.current.temp_c + "°c"}</div>
            </div>
        </div>`
        header.insertAdjacentHTML('afterend', html);
        }
    })
}