import axios from "axios"
import { useEffect, useState } from "react"

const Country = ({ country }) => {
  const { name, languages, capital, area, flags, latlng } = country
  const [weather, setWeather] = useState([])

  const getWeather = async () => {
    const url = 'https://api.openweathermap.org/data/2.5/weather'
    const params = new URLSearchParams()
    params.append('lat', latlng[0])
    params.append('lon', latlng[1])
    params.append('units', 'metric')
    params.append('appid', process.env.REACT_APP_OPEN_WEATHER_KEY)
    const res = await axios.get(url, {params})
    const data = res.data
    const newWeather = {
      temperature: data.main.temp,
      wind: data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    }
    setWeather(newWeather)
  }

  useEffect(() => {
    getWeather()
  }, [])

  return (
    <div>
      <h2>{name.common}</h2>
      capital {capital} <br />
      area {area} <br />
      <h3>languages:</h3>
      <ul>
        {Object.entries(languages).map(([key, value]) => <li key={key}>{value}</li>)}
      </ul>
      <img alt="" src={flags.png} width='200' height='150' />
      <h3>Weather in {capital}</h3>
      temperature {weather.temperature} Celcius <br />
      <img src={weather.icon} alt="" /> <br />
      wind {weather.wind} m/s
    </div>
  )
}

const CountryList = ({country:{name},onClick}) => {
  return (
    <li style={{listStyleType: "none"}}>
      {name.common} <button onClick={() => onClick(name.common)}>show</button>
    </li>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [countriesFiltered, setCountriesFiltered] = useState([])
  const [filter, setFilter] = useState('')
  const url = 'https://restcountries.com/v3.1/all'

  const getCountries = async () => {
    const response = await axios.get(url)
    const data = response.data
    setCountries(data)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  const handleShowBtnClick = (value) => {
    setFilter(value)
  }

  useEffect(() => {
    getCountries()
  }, [])

  useEffect(() => {
    setCountriesFiltered(countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase())))
  }, [countries, filter])

  return (
    <div>
      <div>find countries <input onChange={handleFilterChange} /></div>

      {countriesFiltered.length > 10 ?
        "Too many matches, specify another filter" :
        countriesFiltered.length === 1 ?
          countriesFiltered.map(country => <Country key={country.name.common} country={country} />) :
          countriesFiltered.map(country => 
            <CountryList key={country.name.common}
              country={country}
              onClick={handleShowBtnClick}
            />)
      }
    </div>
  )
}

export default App
