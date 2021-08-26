import './index.css';

const APIHandler = async function handleAPICall(city){
  const loader = document.querySelector('.loader-wrapper');
  const API_KEY = '02a6f954ab970bb876fe66e0dc7afd16';
  loader.style.display = 'flex';
  await new Promise(res => setTimeout(res,2000));
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
  loader.style.display = 'none';
  if(response.ok){
  return await response.json();
  }
  else if(response.status === 404){
    return Promise.reject('error 404');
  } else {
    return Promise.reject('some other error:' + response.status)
  }
}

export default APIHandler;
