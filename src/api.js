import axios from 'axios'

const spaceWeather = axios.create({
    baseURL: 'https://services.swpc.noaa.gov'
})

export const solarWind = () => {
    return spaceWeather.get('/products/solar-wind/plasma-5-minute.json').then((data) => {return data})
}