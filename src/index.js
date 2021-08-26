import './index.css';
import weatherData from './handler';
import {CtoF,FtoC} from './data'

const appendData = function(data){
  let tempState = 'C';
  const container = document.querySelector('.container');
  container.textContent = ''; //clear container

  const main = document.createElement('div');
  main.classList.add('main');
  main.textContent = `${data.name}, ${data.sys.country}`;
  main.style.fontSize = '30px';

  const description = document.createElement('div');
  description.textContent = `${data.weather[0].description}`;
  const tempContainer = document.createElement('div');
  tempContainer.classList.add('flex-div');
  const currTemp = document.createElement('div');
  currTemp.textContent = `${data.main.temp} \xB0C`;
  const currWeatherImg = document.createElement('img');
  currWeatherImg.src = `http://www.openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  tempContainer.appendChild(currTemp);
  tempContainer.appendChild(currWeatherImg);

  container.appendChild(main);
  container.appendChild(tempContainer);
  container.appendChild(description);

  //extras
  const extras = document.querySelector('.extra');
  extras.textContent = ''; //clear extra

  const feelsLike = document.createElement('div');
  const pressure = document.createElement('div');
  const humidity = document.createElement('div');
  const temp_min = document.createElement('div');
  const temp_max = document.createElement('div');

  feelsLike.textContent = `Feels Like: ${data.main.feels_like}\xB0C`;
  pressure.textContent = `Pressure: ${data.main.pressure}hPa`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  temp_min.textContent = `Min Temp: ${data.main.temp_min}\xB0C`;
  temp_max.textContent = `Max Temp: ${data.main.temp_max}\xB0C`;

  extras.appendChild(feelsLike);
  extras.appendChild(pressure);
  extras.appendChild(humidity);
  extras.appendChild(temp_min);
  extras.appendChild(temp_max);

  const tempChange = document.querySelector('.tempChange');
  tempChange.addEventListener('click', function(e){
  if(tempState === 'C'){
    tempState ='F'
  currTemp.textContent = `${CtoF(data.main.temp)} \xB0${tempState}`;
  feelsLike.textContent = `Feels Like: ${CtoF(data.main.feels_like)}\xB0${tempState}`;
  temp_min.textContent = `Min Temp: ${CtoF(data.main.temp_min)}\xB0${tempState}`;
  temp_max.textContent = `Max Temp: ${CtoF(data.main.temp_max)}\xB0${tempState}`;
  } else {
    tempState = 'C';
  currTemp.textContent = `${data.main.temp} \xB0${tempState}`;
  feelsLike.textContent = `Feels Like: ${data.main.feels_like}\xB0${tempState}`;
  temp_min.textContent = `Min Temp: ${data.main.temp_min}\xB0${tempState}`;
  temp_max.textContent = `Max Temp: ${data.main.temp_max}\xB0${tempState}`;
  }

  })
}

const displayData = function (city) {
  weatherData(city).then((data) => {
    console.log(data);
  appendData(data);
  }).catch((err) => {
    const alert = document.querySelector('.alert');
    alert.classList.toggle('visible');
    setTimeout(()=>alert.classList.toggle('visible'),2000);
    console.log(err)
  })
}

const App = function () {
  const searchForm = document.querySelector('.searchForm');
  const search = searchForm.querySelector('.search');
  const submit = searchForm.querySelector('.submit');

  submit.addEventListener('click',function(e){
    displayData(search.value);
  })

  search.addEventListener('keydown',function(e){
    if (e.keyCode === 13) {
      e.preventDefault();
      displayData(search.value);
    }
  })

  displayData('London');
}

App();
