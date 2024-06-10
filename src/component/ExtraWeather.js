import React, { useEffect, useState } from 'react';
import '../weather.css';


function ExtraWeather({ cityName }) {
    const [cityname, setCityname] = useState(cityName);
    const [weatherData, setWeatherData] = useState();
    const [currentTime, setCurrentTime] = useState(new Date());
    const apiKey = '4a1c96fc8324cec7b0d8378ae0410a5c';

    const fetchWeater = async () => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        setWeatherData(data)
    }
    useEffect(() => {
        fetchWeater()
        const interval = setInterval(() => {
            // console.log(new Date())
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Handle city search and fetch new weather data


    // Convert the UNIX timestamp to a Date object (multiply by 1000 to convert seconds to milliseconds)
    var timestamp;
    const fetchWeatherData = async (e) => {
        console.log(e.target.value.length)
        setCityname(e.target.value);

        if (e.target.value.length > 0) {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&units=metric&appid=${apiKey}`);
                console.log(response, "response");

                const data = await response.json();
                console.log(data, "data");
                timestamp = data.dt
                const datee = new Date(timestamp * 1000);

                const timeZoneOffsetSeconds = -14400; // -14400 seconds = -4 hours

                // Convert timestamp to milliseconds
                const timestampMilliseconds = timestamp * 1000;

                // Adjust for time zone offset
                const adjustedTimestamp = timestampMilliseconds + (timeZoneOffsetSeconds * 1000);

                // Create a Date object with the adjusted timestamp
                const date = new Date(adjustedTimestamp);

                // Format the date
                const humanReadableDate = date.toLocaleString();

                console.log(humanReadableDate, "fdf");

                setWeatherData(data);
            } catch (error) {
                console.error(error);
            }
        }
        if (e.target.value.length == 0) {
            fetchWeater()
        }
    };




    const iconUrl = weatherData && weatherData.weather && weatherData.weather.length > 0
        ? `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
        : '';

    const backgroundStyle = weatherData && weatherData.weather && weatherData.weather.length > 0
        ? getBackgroundStyle(weatherData.weather[0].id)
        : 'default-bg';

    return (
         <div className='ExtraWeather_main'>
        <div className={`content2 ${backgroundStyle}`}>
            <div className='search_form2'>
                <input
                    type='text'
                    value={cityname}
                    onChange={fetchWeatherData}
                    placeholder='Enter city name'
                />
            </div>
            {weatherData && weatherData.weather && weatherData.weather.length > 0 && (
                <>
                    <h1>{weatherData.name}</h1>
                    <img src={iconUrl} alt={weatherData.weather[0].description} className="weather-icon" />
                    <div style={{ display: "flex" }}>
                     
                        <p>{weatherData.weather[0].description}</p>


                    </div>

                    <p style={{ marginLeft: "10px" }}>Wind speed: {weatherData.wind.speed}m/s</p>
                    <p style={{ marginLeft: "10px" }}>humidity: {weatherData.main.humidity}%</p>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                </>
            )}
            <div className='date_time2'>

                {currentTime.toLocaleString()}
            </div>
        </div>
        </div>
    );
}


export default ExtraWeather;


const getBackgroundStyle = (id) => {
    if (id >= 200 && id < 300) return 'thunderstorm-bg';
    if (id >= 300 && id < 400) return 'drizzle-bg';
    if (id >= 500 && id < 600) return 'rain-bg';
    if (id >= 600 && id < 700) return 'snow-bg';
    if (id >= 700 && id < 800) return 'atmosphere-bg';
    if (id === 800) return 'clear-bg';
    if (id > 800 && id < 900) return 'clouds-bg';
    return 'default-bg';
};