import React, { useState } from 'react';

const api = {
  key: "be750803d2c81c8631fb0f967928220d",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const getTemp = () => {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
      setWeather(result);
      setQuery('');
      console.log(result);
    });
  }

  // setInterval(() => {

  // },5000);

  // window.addEventListener('resize' , () => {
  //   if(window.innerWidth <= '480px'){
  //       document.getElementById('div1').style.visibility = 'hidden';
  //   }
  // })


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search Location..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
           <button onClick={getTemp}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            </button>
           
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
            <div className="bottom">
              <div className="feels">
                <p>Feels Like</p>
                <p className='bold'>{weather.main.feels_like.toFixed()}°F</p>

              </div>
              <div className="humidity">
                <p>Humidity</p>
                <p className='bold'>{weather.main.humidity}%</p>

              </div>
              <div className="wind">
                <p>Wind Speed</p>
                <p className='bold'>{weather.wind.speed.toFixed()} MPH</p>

              </div>
            </div>
          </div>
        ) : (
          <div className='initial'>
            <h2>Weather Forecasting</h2>
            <p>Search the location of your choice and get the weather updates</p>
            {/* <div id='div1' className='icons'>
            <div><Cloudy/>
            <p>Cloudy</p>
            </div>
            <div> <Rain />
            <p>Rainy</p>
            </div>
            <div> <Sunny /> 
            <p>Sunny</p>
            </div>
            


           
           
            </div> */}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;