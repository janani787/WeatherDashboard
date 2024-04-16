//declaring variables
 const cityID = document.getElementById('city');
 const weather = document.getElementById('weather');
 const weatherForecast = document.getElementById('weatherForecast');
 
 const weatherCard = document.getElementById('weatherCard');
const submit = document.querySelector('#btnsubmit');
const APIKey ='4b18645b0b94b56de60c27762466c7d2';

const buttonClickHandler=function(event)
{
  event.preventDefault();
    const cityName=cityID.value.trim();
    if(cityName)
    {   getWeatherStatus(cityName);
        city.textContent="";
    }
    else{
        alert("please enter city name");
    }
}
function getWeatherStatus(city)
{

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
  console.log(apiUrl);
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            renderWeatherDetails(data);
          
          });
        } else {
          alert(`Error:${response.statusText}`);
        }
      })
      .catch(function (error) {
        console.log(error.statusText);
      });
    
  


}
function getForecastWeather(lat,lon)
{
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;
  console.log(apiUrl);
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            renderWeatherForecastDetails(data);
          
          });
        } else {
          alert(`Error:${response.statusText}`);
        }
      })
      .catch(function (error) {
        console.log(error.statusText);
      });
    
}

function renderWeatherDetails(data)
{
  const cityName=document.createElement("h2");

  cityName.textContent=data.name;
  weather.append(cityName);
  const img=document.createElement("img");
  img.src=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weather.append(img);
  const temp=document.createElement("h3");
  temp.innerHTML="Temp:";
  temp.textContent=data.main.temp;
  weather.append(temp);
  const wind=document.createElement("h3");
  wind.innerHTML="Wind:";
  wind.textContent=data.wind.speed;
  weather.append(wind);
  const humidity=document.createElement("h3");
  humidity.innerHTML="Humidity";
 humidity.textContent=data.main.humidity;
 weather.append(humidity);
  
  console.log(data.coord.lat);
  console.log(data.coord.lon);
  console.log(data.weather[0].icon);
  getForecastWeather(data.coord.lat,data.coord.lon);
  
};



function renderWeatherForecastDetails(data)
{

for (let i=7;i<=33;i++)
  {
  const createHeader= document.createElement("div");
  createHeader.classList.add("card");
  createHeader.classList.add("mb-3");
  createHeader.classList.add("border-info");
  createHeader.classList.add("bg-info");
  createHeader.style.width='25%';
  
  weatherCard.append(createHeader);
  const createBody=document.createElement("div");
  createBody.classList.add("card-body");
  createHeader.append(createBody);
  const forecastDate = document.createElement("h5");
// data.list[0].dt_txt
// data.list[0].main.temp
// data/list[0].main.humidity
// data.list[0].wind.speed
// data.list[0].weather[0].description

  forecastDate.classList.add("card-title");
  createHeader.append(forecastDate);
  const img=document.createElement("img");
  img.style.width='50px';
img.style.height='50px';
  createHeader.append(img);
  const temp=document.createElement("P");
  temp.classList.add("card-text");
  createHeader.append(temp);
  const humidity= document.createElement("P");
  humidity.classList.add("card-text");
  createHeader.append(humidity);
  const wind= document.createElement("P");
  wind.classList.add("card-text");
  createHeader.append(wind);
  const date= new Date(data.list[i].dt_txt);
  forecastDate.textContent=date.toLocaleDateString();
  temp.textContent="Temp: "+ data.list[i].main.temp;
  humidity.textContent="Humidity: "+ data.list[i].main.humidity
  wind.textContent="Wind: "+data.list[i].wind.speed;
  img.src=`https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`;
  i=i+6;
  }
}

submit.addEventListener('click',buttonClickHandler);
