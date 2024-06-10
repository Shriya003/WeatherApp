import './weather.css';
import Weather_card from './component/Weather_card';
import { useEffect, useState } from 'react';

function Weather() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const apiKey = '4a1c96fc8324cec7b0d8378ae0410a5c';

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        const success = (position) => {
            const { latitude, longitude } = position.coords;

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`Network response was not ok: ${res.statusText}`);
                    }
                    return res.json();
                })
                .then((res) => setData(res))
                .catch((error) => setError(error.message));
        };

        const error = () => {
            setError('Unable to retrieve your location');
        };

        navigator.geolocation.getCurrentPosition(success, error);
    }, [apiKey]);

    if (error) {
        return <div className='main'>Error: {error}</div>;
    }

    if (!data) {
        return <div className='main'>Loading...</div>;
    }
  

    return (
        <div className='main'>
            <Weather_card data={data} />
            
        </div>

    );
}

export default Weather;
