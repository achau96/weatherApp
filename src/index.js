import './index.css';
import weatherData from './handler';
import data from './data'

const appendData = function(data){
  const container = document.querySelector('.container');
  container.textContent = ''; //clear container

  const main = document.createElement('div');
  main.classList.add('main');
  main.textContent = `${data.name}, ${data.sys.country}`;
  main.style.fontSize = '30px';

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
