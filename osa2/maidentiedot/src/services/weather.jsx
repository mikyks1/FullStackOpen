import axios from "axios"

const api_key = import.meta.env.VITE_WEATHER_KEY

const getWeather = (lat, lon) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
    const request = axios.get(weatherUrl)
    return request.then(response => response.data)
}

export default { getWeather }

