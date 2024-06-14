let nameCity = document.querySelector(".name");
let tempC = document.querySelector(".temp_c");
let text = document.querySelector(".text");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let east = document.querySelector(".east");
let dayName = document.querySelector(".day");
let input = document.querySelector("input");
let search = document.querySelector(".search");
let weatherError = document.querySelector(".weatherError");
let info = document.querySelector(".info");
let nameDay = document.querySelectorAll(".nameDay");
let temp = document.querySelectorAll(".temp");
let next = Array.from(document.querySelectorAll(".col-md-2"));

async function city(Name){
    try{ 
    var result = await fetch(`https://api.weatherapi.com/v1/current.json?key=2a320066c1af409c8cd213242241006&q=${Name}&days=7`)
    let final= await result.json();
    // console.log(final);

    nameCity.innerHTML = `${final.location.name}`
    tempC.innerHTML = `${final.current.temp_c}°C`
    text.innerHTML = `${final.current.condition.text}`
    east.innerHTML = `${final.current.wind_dir}`
    wind.innerHTML = `${final.current.wind_kph}km/h`
    humidity.innerHTML = `${final.current.humidity}%`
    
    
    let months = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"];
    let month = new Date().getMonth();
    let currnetmonth = months[month];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = new Date().getDay();
    let currnetDay = days[day];
    dayName.innerHTML = `${currnetDay} (${new Date().getDate()}  ${currnetmonth})`;

    weatherError.classList.add("d-none");
    
}
catch (error) {


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
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=2a320066c1af409c8cd213242241006&q=${latitude},${longitude}&days=7`);
            const data = await response.json();
            
            nameCity.innerHTML = data.location.name;
            tempC.innerHTML = `${data.current.temp_c}°C`;
            text.innerHTML = data.current.condition.text;
            east.innerHTML = data.current.wind_dir;
            wind.innerHTML = `${data.current.wind_kph}km/h`;
            humidity.innerHTML = `${data.current.humidity}%`;
            
            let currentDate = new Date();
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            
            let currentDay = days[currentDate.getDay()];
            let currentMonth = months[currentDate.getMonth()];
            
            dayName.innerHTML = `${currentDay} (${currentDate.getDate()} ${currentMonth})`;
            
            weatherError.classList.add("d-none");
        });
    } catch (error) {
        weatherError.innerHTML = 'Failed to get current location';
        weatherError.classList.remove("d-none");
    }
}
getWeatherByGeolocation()
city("cairo");

function searchF() {
    let term = input.value.trim(); 
    city(term);
}
input.addEventListener("input", () => {
    searchF() 
});
search.addEventListener("click", () => {
    searchF() 
});
// cv مدرس تاسيس صفوف الولبيه //