const dayBlocks = document.querySelectorAll('.tableInfoDay')
const downBlocks = document.querySelectorAll('.tableInfoDown');

dayBlocks.forEach((dayBlock, index) => {
    dayBlock.addEventListener('click', () => {
        const downBlock = downBlocks[index];
        const isVisible = downBlock.style.display === 'block';

        downBlocks.forEach(block => {
            block.style.display = 'none';
            block.classList.remove('active');
        });

        dayBlocks.forEach(block => {
            block.classList.remove('active-day');
        });

        if (!isVisible) {
            downBlock.style.display = 'block';
            downBlock.classList.add('active');
            dayBlock.classList.add('active-day');
        }
    });
});


const search = document.getElementById('search')

window.addEventListener('keypress', e => {if(e.key === 'Enter')fetchData(generateURL())})
search.addEventListener('click', () => {fetchData(generateURL())})

function generateURL() {
    const cityName = document.querySelector('input').value
    const langBrow = navigator.language
    const mainUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&lang=${langBrow}&appid=418b95f1f028afc1a3c10087c1d8db0d`
   
    return mainUrl
}

function generateGeoURL(lat, lon) {
    const langBrow = navigator.language
    const mainUrlGeo = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=${langBrow}&appid=418b95f1f028afc1a3c10087c1d8db0d`

    return mainUrlGeo
}

document.getElementById('myLocationBtn').addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const geoUrl = generateGeoURL(lat, lon);
        fetchData(geoUrl)
    });
});

async function fetchData(url){
    try {
        const response = await fetch(url)
        const data = await response.json()
        if(data.cod === '404'){
            console.log(data.message);
            return
        }
        showInfo(data)
        showInfo5Days(data)
        showInfoDown(data)
        showInfo5DaysDown(data)
    } catch (error) {
        console.error(error);
    }
}

function getMyIcon(icon) {
    const icons = {
        '01d': 'sun.gif',
        '02d': 'cloud.gif',
        '03d': 'cloudy.gif',
        '04d': 'clouds.gif',
        '10d': 'rain.gif',
        '09d': 'showerRain.gif',
        '11d': 'thunderstorm.gif',
        '13d': 'snow.gif',
        '50d': 'mist.gif',
        '01n': 'moon.gif',
        '02n': 'cloudN.gif',
        '03n': 'cloudy.gif',
        '04n': 'clouds.gif',
        '10n': 'rain.gif',
        '09n': 'showerRain.gif',
        '11n': 'thunderstorm.gif',
        '13n': 'snow.gif',
        '50n': 'mist.gif',
    }
    const chooseIcon = icon.toLowerCase()
    for(let key in icons){
        if (chooseIcon.includes(key)){
            return `./img/${icons[key]}`
        }
    }
}

function showInfo(data){
    const all = data.list[0]
    const{dt_txt, main, visibility, weather, wind} = all
    const {feel_like, grnd_level, humidity, pressure, sea_level, temp, temp_kf, temp_max, temp_min} = main
    const {description, icon} = weather[0]
    const {deg, gust, speed} = wind
    const img = getMyIcon(icon)    

    const date = new Date(dt_txt);
    const dayName = date.toLocaleString('uk-UA', { weekday: 'long' });
    const formattedDate = date.toLocaleString('uk-UA', { day: '2-digit', month: 'numeric' });
    const tempCelsiusMax = Math.round(temp_max - 273.15);
    const tempCelsiusMin = Math.round(temp_min - 273.15);

    const tableInfoDay1 = document.getElementById('tableInfoDay1')
    const elements = `
        <p id="dayOne">${dayName}</p>
        <p id="dateOne">${formattedDate}</p>
        <p class="iconMain"><img src=${img}></p>
        <p class="temp">${tempCelsiusMax}°  ${tempCelsiusMin}°</p>
        <p>${description}</p>
    `
    tableInfoDay1.innerHTML = elements
}

function showInfo5Days(data) {
    const downBlocks = document.querySelectorAll('.tableInfoDown')

    downBlocks.forEach(block => block.innerHTML = '')

    for (let i = 1; i < 6; i++) {
        const dayNext = data.list[i * 8];

        if (!dayNext) continue;

        const { dt_txt, main, weather, wind } = dayNext;
        const { temp_max, temp_min } = main;
        const { description, icon } = weather[0];
        const img = getMyIcon(icon)

        const date = new Date(dt_txt);
        const dayName = date.toLocaleString('uk-UA', { weekday: 'long' });
        const formattedDate = date.toLocaleString('uk-UA', { day: '2-digit', month: 'numeric' });
        const tempCelsiusMax = Math.round(temp_max - 273.15);
        const tempCelsiusMin = Math.round(temp_min - 273.15);

        const tableInfoDay = document.getElementById(`tableInfoDay${i + 1}`);
        const elements = `
            <p id="dayOne">${dayName}</p>
            <p id="dateOne">${formattedDate}</p>
            <p class="iconMain"><img src=${img}></p>
            <p class="temp">${tempCelsiusMax}°  ${tempCelsiusMin}°</p>
            <p>${description}</p>
        `;
        tableInfoDay.innerHTML = elements;
    }

}

function showInfoDown(data){
    const forecast = data.list[1];

    const{dt_txt, main, visibility, weather, wind} = forecast
    const {feel_like, grnd_level, humidity, pressure, sea_level, temp, temp_kf, temp_max, temp_min} = main
    const {description, icon} = weather[0]
    const {deg, gust, speed} = wind
    const img = getMyIcon(icon)

    const time = new Date(dt_txt).toLocaleTimeString('uk-UA', {
        hour: '2-digit',
        minute: '2-digit'
    });
    const tempCelsius = Math.round(temp - 273.15);

    const tableInfoDown1 = document.getElementById('tableInfoDown1')
    const elements = `
        <p>${time}</p>
        <p>${tempCelsius}°</p>
    `
    tableInfoDown1.innerHTML = elements
}

function showInfo5DaysDown(data) {
    const downBlocks = document.querySelectorAll('.tableInfoDown');

    downBlocks.forEach(block => block.innerHTML = '');

    const startDate = new Date(data.list[0].dt_txt);

    for (let i = 1; i <= 5; i++) {
        const nowDay = new Date(startDate);
        nowDay.setDate(nowDay.getDate() + i);
        const currentDayStr = nowDay.toISOString().split('T')[0];

        const dayForecasts = data.list.filter(item => item.dt_txt.startsWith(currentDayStr));
        const downBlock = document.getElementById(`tableInfoDown${i}`);

        if (!downBlock) continue;

        let downBlockContent = '';

        dayForecasts.forEach(entry => {
            const{dt_txt, main, visibility, weather, wind, pop} = entry
            const {feel_like, grnd_level, humidity, pressure, sea_level, temp, temp_kf, temp_max, temp_min} = main
            const {description, icon} = weather[0]
            const {deg, gust, speed} = wind
            const img = getMyIcon(icon)
            

            const time = new Date(dt_txt).toLocaleTimeString('uk-UA', {
                hour: '2-digit',
                minute: '2-digit'
            });
            const tempCelsius = Math.round(entry.main.temp - 273.15);
            const popPercent = Math.round(pop * 100)            

            downBlockContent += `
                <div class="forecast-time-container">
                    <p class="forecast-time">${time}</p>
                    <p class="forecast-temp">${tempCelsius}°</p>
                    <p class="iconItem"><img src=${img}></p>
                    <p class="forecast-pop"><img src="./img/free-icon-umbrella-1795512.png">${popPercent}%</p>
                    <p class="forecast-speed"><img src="./img/free-icon-compass-998938.png">${speed}м/с</p>
                    <p class="forecast-pressure"><img src="./img/free-icon-temperature-control-3625849.png">${pressure}мм</p>
                    <p class="forecast-humidity"><img src="./img/free-icon-liquid-drop-8234265.png">${humidity}%</p>
                </div>
            `;
        });
        downBlockContent +=
        downBlock.innerHTML = downBlockContent;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 18 || currentHour < 6) {
      document.body.classList.add('night-mode');
    }
  });

const toggleButton = document.getElementById('toggle-mode');

if (localStorage.getItem('theme') === 'night') {
  document.body.classList.add('night-mode');
} else {
  document.body.classList.remove('night-mode');
}

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('night-mode');

  if (document.body.classList.contains('night-mode')) {
    localStorage.setItem('theme', 'night');
  } else {
    localStorage.setItem('theme', 'day');
  }
});
