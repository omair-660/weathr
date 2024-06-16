let nameCity = document.querySelector(".name");
let tempC = document.querySelector(".temp_c");
let text = document.querySelector(".text");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let east = document.querySelector(".east");
let dayName = document.querySelector(".day");
let input = document.querySelector("input");
let img = document.querySelectorAll(".next img");
let search = document.querySelector(".search");
let weatherError = document.querySelector(".weatherError");
let weather = document.querySelector(".weather");
let info = document.querySelector(".info");
let nameDay = document.querySelectorAll(".nameDay");
let temp = document.querySelectorAll(".temp");
let next = Array.from(document.querySelectorAll(".col-md-2"));

let months = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"];
let month = new Date().getMonth();
let currnetmonth = months[month];

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = new Date().getDay();
let currnetDay = days[day];

async function city(Name) {
    try {
        let result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2a320066c1af409c8cd213242241006&q=${Name}&days=7`);
        let final = await result.json();

        nameCity.innerHTML = `${final.location.name}`;
        tempC.innerHTML = `${final.current.temp_c}°C`;
        text.innerHTML = `${final.current.condition.text}`;
        east.innerHTML = `${final.current.wind_dir}`;
        document.querySelector(".weather img").src = getWeatherIcon(final.current.condition.code);
        wind.innerHTML = `${final.current.wind_kph} km/h`;
        humidity.innerHTML = `${final.current.humidity}%`;

        dayName.innerHTML = `${currnetDay} (${new Date().getDate()}  ${currnetmonth})`;

        weatherError.classList.add("d-none");

        let forecastDays = final.forecast.forecastday;
        for (let y = 0; y < forecastDays.length && y < temp.length; y++) {
            let day = forecastDays[y];
            temp[y].innerHTML = `${day.day.avgtemp_c}°C`;
            img[y].src = getWeatherIcon(day.day.condition.code);
        }
    } catch (error) {
        if (Name.trim() === "") {
            weatherError.innerHTML = 'Please enter a valid city name';
        } else {
            weatherError.innerHTML = `City not found or invalid request for ${Name}`;
        }
        weatherError.classList.remove("d-none");
    }
}

async function getWeatherByGeolocation() {
    try {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2a320066c1af409c8cd213242241006&q=${latitude},${longitude}&days=7`);
            let data = await response.json();

            nameCity.innerHTML = data.location.name;
            tempC.innerHTML = `${data.current.temp_c}°C`;
            text.innerHTML = data.current.condition.text;
            east.innerHTML = data.current.wind_dir;
            wind.innerHTML = `${data.current.wind_kph} km/h`;
            humidity.innerHTML = `${data.current.humidity}%`;

            dayName.innerHTML = `${currnetDay} (${new Date().getDate()} ${currnetmonth})`;

            weatherError.classList.add("d-none");

            let forecastDays = data.forecast.forecastday;
            for (let y = 0; y < forecastDays.length && y < temp.length; y++) {
                let day = forecastDays[y];
                temp[y].innerHTML = `${day.day.avgtemp_c}°C`;
                img[y].src = getWeatherIcon(day.day.condition.code);
            }
        });
    } catch (error) {
        weatherError.innerHTML = 'Failed to get current location';
        weatherError.classList.remove("d-none");
    }
}

city("Cairo");

function searchF() {
    let term = input.value.trim();
    city(term);
}

input.addEventListener("input", () => {
    searchF();
});

search.addEventListener("click", () => {
    searchF();
});

weather.addEventListener("load", () => {
    weather.innerHTML = "Loading...";
});

document.addEventListener("DOMContentLoaded", function() {
    let body = document.querySelector("body");

    let date = new Date();
    let hour = date.getHours();
    if (hour >= 19 || hour < 6) {
        body.style.backgroundImage = "url('../image/bg-3.jpg')";
    } else {
        body.style.backgroundImage = "url('../image/bg1.jpg')";
    }
});

for (let i = 0; i < nameDay.length; i++) {
    let dayIndex = (day + i + 1) % 7;
    nameDay[i].innerHTML = days[dayIndex];
}

function getWeatherIcon(conditionCode) {
    switch (conditionCode) {
        case 1000: 
            return "../image/sunny.png";
        case 1003: 
            return "../image/partly-cloudy.png";
        case 1006: 
            return "../image/partly-cloudy.png";
        case 1030: 
            return "../image/windy.png";
        case 1063: 
        case 1087: 
            return "../image/thunderstorm.png";
        case 1183: 
        case 1186:
            return "../image/raining.png";
        
        default:
            return "../image/default_icon.png";
    }
}

// cv مدرس تاسيس صفوف الولبيه //