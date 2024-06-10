import logo from './logo.svg';
import './App.css';
import Weather from './Weather';
import Weather_card from './component/Weather_card'
import ExtraWeather from './component/ExtraWeather';
function App() {
  return (
    <div >
      <Weather />
      
      <div style={{
        // border: "10px solid red",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        
      }}>
        
        <ExtraWeather cityName={'tokyo'} />
        <ExtraWeather cityName={'new york'}/>
        <ExtraWeather cityName={'london'}/>
      </div>
    </div>


  );
}

export default App;
