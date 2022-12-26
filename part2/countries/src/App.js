import axios from "axios"
import { useEffect, useState } from "react"

const Country = ({ country, showDetail, onClick }) => {
  const { name, languages, capital, area, flags } = country
  if (showDetail) return (
    <div>
      <h2>{name.common}</h2>
      capital {capital} <br />
      area {area} <br />
      <h3>languages:</h3>
      <ul>
        {Object.entries(languages).map(([key, value]) => <li key={key}>{value}</li>)}
      </ul>
      <img alt="" src={flags.png} width='200' height='150' />
    </div>
  )
  return (
    <li style={{listStyleType: "none"}}>
      {name.common} <button onClick={() => onClick(name.common)}>show</button>
      <img alt="" src={flags.png} style={{ display: "none" }} width='200' height='150' />
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
    
    console.log("debug value:", value)
  }

  useEffect(() => {
    getCountries()
  }, [])

  useEffect(() => {
    console.log("useEffect:",filter)
    setCountriesFiltered(countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase())))
  }, [countries, filter])

  return (
    <div>
      <div>find countries <input onChange={handleFilterChange} /></div>

      {countriesFiltered.length > 10 ?
        "Too many matches, specify another filter" :
        countriesFiltered.length === 1 ?
          countriesFiltered.map(country => <Country key={country.name.common} country={country} showDetail={true} />) :
          countriesFiltered.map(country => 
            <Country key={country.name.common}
              country={country}
              showDetail={false}
              onClick={handleShowBtnClick}
            />)
      }
    </div>
  )
}

export default App
