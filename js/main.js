const dayBlocks = document.querySelectorAll('.tableInfoDay')
const downBlocks = document.querySelectorAll('.tableInfoDown');

dayBlocks.forEach((dayBlock, index) => {
    dayBlock.addEventListener('click', () => {
        const downBlock = downBlocks[index]
        if(downBlock.style.display === 'none' || downBlock.style.display === ''){
            downBlock.style.display = 'block'
        } else {
            downBlock.style.display = 'none'
        }
    })
})

const search = document.getElementById('search')

window.addEventListener('keypress', e => {if(e.key === 'Enter')fetchData(generateURL())})
search.addEventListener('click', () => {fetchData(generateURL())})

function generateURL() {
    const cityName = document.querySelector('input').value
    const mainUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&lang=ua&appid=418b95f1f028afc1a3c10087c1d8db0d`
    return mainUrl
}

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
    } catch (error) {
        console.error(error);
    }
}

function showInfo(data){
    const all = data.list[0]
    const{dt_txt, main, visibility, weather, wind} = all
    const {feel_like, grnd_level, humidity, pressure, sea_level, temp, temp_kf, temp_max, temp_min} = main
    const {description, icon} = weather[0]
    const {deg, gust, speed} = wind
    const img = `https://openweathermap.org/img/wn/${icon}@2x.png`

    const date = new Date(dt_txt);
    const dayName = date.toLocaleString('uk-UA', { weekday: 'long' });
    const formattedDate = date.toLocaleString('uk-UA', { day: '2-digit', month: 'numeric' });
    const tempCelsiusMax = Math.round(temp_max - 273.15);
    const tempCelsiusMin = Math.round(temp_min - 273.15);

    const tableInfoDay1 = document.getElementById('tableInfoDay1')
    const elements = `
        <p id="dayOne">${dayName}</p>
        <p id="dateOne">${formattedDate}</p>
        <p class="icon"><img src=${img}></p>
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
        const img = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        const date = new Date(dt_txt);
        const dayName = date.toLocaleString('uk-UA', { weekday: 'long' });
        const formattedDate = date.toLocaleString('uk-UA', { day: '2-digit', month: 'numeric' });
        const tempCelsiusMax = Math.round(temp_max - 273.15);
        const tempCelsiusMin = Math.round(temp_min - 273.15);

        const tableInfoDay = document.getElementById(`tableInfoDay${i + 1}`);
        const elements = `
            <p id="dayOne">${dayName}</p>
            <p id="dateOne">${formattedDate}</p>
            <p class="icon"><img src=${img}></p>
            <p class="temp">${tempCelsiusMax}°  ${tempCelsiusMin}°</p>
            <p>${description}</p>
        `;
        tableInfoDay.innerHTML = elements;
    }

}