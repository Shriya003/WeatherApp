import React, { useEffect, useState } from 'react';
import '../weather.css';

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

function Weather_card({ data }) {
    const [cityname, setCityname] = useState('');
    const [weatherData, setWeatherData] = useState(data);
    const [currentTime, setCurrentTime] = useState(new Date(data.dt * 1000));
    const [theme, setTheme] = useState('light-theme'); // Ensure theme is initialized here
    const apiKey = '4a1c96fc8324cec7b0d8378ae0410a5c';

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const fetchWeatherData = async (e) => {
        setCityname(e.target.value);

        if (e.target.value.length > 0) {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&units=metric&appid=${apiKey}`);
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.error(error);
            }
        } else {
            setWeatherData(data);
        }
    };

    const iconUrl = weatherData && weatherData.weather && weatherData.weather.length > 0
        ? `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
        : '';

    const backgroundStyle = weatherData && weatherData.weather && weatherData.weather.length > 0
        ? getBackgroundStyle(weatherData.weather[0].id)
        : 'default-bg';

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark-theme' ? 'light-theme' : 'dark-theme');
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <div className={`main2 ${backgroundStyle}`}>
            <button onClick={toggleTheme}>Toggle Theme</button>
            <div className='content'>
                <div className='search_form'>
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
                        <p>{weatherData.weather[0].description}</p>
                        <p style={{ marginLeft: "10px" }}>Wind speed: {weatherData.wind.speed} m/s</p>
                        <p style={{ marginLeft: "10px" }}>Humidity: {weatherData.main.humidity} %</p>
                        <p>Temperature: {weatherData.main.temp}°C</p>
                    </>
                )}
                <div className='date_time'>
                    {currentTime.toLocaleString()}
                </div>
            </div>
        </div>
    );
}

export default Weather_card;
