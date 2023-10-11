import weatherService from "../services/weather"
import { useState } from "react"



const Weather = ({ coords, capital }) => {
    const GetWeather = () => {
        weatherService.getWeather(coords.latlng[0], coords.latlng[1]).then(weather => { setWeatherData(weather) })
    }

    const [weatherData, setWeatherData] = useState(GetWeather)

    if (!weatherData) {
        return null
    }
    return (
        <div>
            <h2>Weather in {capital}</h2>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
            <div>{weatherData.weather[0].description}</div>
            <br />
            <div>Temperature: {weatherData.main.temp}°C</div>
            <div>Wind: {weatherData.wind.speed}m/s</div>
            <div>Humidity: {weatherData.main.humidity}%</div>
            <div>Pressure: {weatherData.main.pressure}hPa</div>
        </div>
    )
}

export default Weather