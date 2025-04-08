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
        // showInfo5Days(data)
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
    
    // Форматування дати
    const date = new Date(dt_txt);
    const dayName = date.toLocaleString('uk-UA', { weekday: 'long' }); // Назва дня тижня
    const formattedDate = date.toLocaleString('uk-UA', { day: '2-digit', month: 'numeric' }); // Дата у форматі день, місяць

    const textDay = document.querySelector('.textDay')
    const elements = `
    <p id="dayOne">${dayName}</p>
    <p id="dateOne">${formattedDate}</p>
    <p class="icon"><img src=${img}></p>
    <p>Максимальна температура: ${temp_max}</p>
    <p>Мінімальна температура: ${temp_min}</p>
    <p>Опис: ${description}</p>
    `
    textDay.innerHTML = elements

    // const ul = document.getElementById('weatherNow')
    // const elements = `
    // <li>Дата та час: ${dt_txt}</li>
    // <li>Видимість: ${visibility}</li>
    // <li>Відчувається як: ${feel_like}</li>
    // <li>Тиск на рівні землі: ${grnd_level}</li>
    // <li>Вологість: ${humidity}</li>
    // <li>Тиск: ${pressure}</li>
    // <li>Тиск на рівні моря: ${sea_level}</li>
    // <li>Температура: ${temp}</li>
    // <li>Максимальна температура: ${temp_max}</li>
    // <li>Мінімальна температура: ${temp_min}</li>
    // <li>Опис: ${description}</li>
    // <li class="icon"><img src=${img}></li>
    // <li>Пориви вітру: ${gust}</li>
    // <li>Швидкість вітру: ${speed}</li>
    // `
    // ul.innerHTML = elements
}

// function showInfo5Days(data){
//     const table = document.getElementById('weatherfor5Days')

//     data.list.forEach(el => {
//         const{dt_txt, main, visibility, weather, wind} = el
//         const {feel_like, grnd_level, humidity, pressure, sea_level, temp, temp_kf, temp_max, temp_min} = main
//         const {description, icon} = weather[0]
//         const {deg, gust, speed} = wind
//         const img = `https://openweathermap.org/img/wn/${icon}@2x.png`
    
//         const elements = `
//         <td>dt_txt:${dt_txt}</td>
//         <td>visibility:${visibility}</td>
//         <td>feel_like:${feel_like}</td>
//         <td>grnd_level:${grnd_level}</td>
//         <td>humidity:${humidity}</td>
//         <td>pressure:${pressure}</td>
//         <td>sea_level:${sea_level}</td>
//         <td>temp:${temp}</td>
//         <td>temp_kf:${temp_kf}</td>
//         <td>temp_max:${temp_max}</td>
//         <td>temp_min:${temp_min}</td>
//         <td>description:${description}</td>
//         <td><img src=${img}>:${icon}</td>
//         <td>deg:${deg}</td>
//         <td>gust:${gust}</td>
//         <td>speed:${speed}</td>
//         `
//         const tr = document.createElement('tr')
//         tr.innerHTML = elements 
//         table.appendChild(tr)
//     });
// }
