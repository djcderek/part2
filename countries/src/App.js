import { useState } from "react"
import { useEffect } from "react"
import axios from 'axios'
import {Buffer} from 'buffer'

const Show = (props) => {
  return (
    <button onClick={() => props.showCountry(props.country)}>show</button>
  )
}

const Display = ({displayData}) => {
  if (displayData === null) {
    return null
  }
  const flagStyle = {
    fontSize: 70
  }

  const languages = Object.values(displayData.languages)
  return (
    <div>
      <h1>{displayData.name.common}</h1>
      <div>capital {displayData.capital}</div>
      <div>area {displayData.area}</div>
      <h3>languages:</h3>
      <div>
        {languages.map(language => {
          return <li>{language}</li>
        })}
      </div>
      <div style={flagStyle}>{displayData.flag}</div>
      <h2>Weather in {displayData.capital}</h2>
      <div>Temp is {(displayData.temp - 273.15).toFixed(2)} celsius</div>
      <img src={displayData.image}></img>
      <div>Wind speed is {displayData.windSpeed} m/s</div>
    </div>
  )
}

function App() {
  const [newCountries, setNewCountries] = useState([])
  const [tooMany, setTooMany] = useState(null)
  const [allCountries, setAllCountries] = useState([])
  const [displayData, setDisplayData] = useState(null)

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const searchCountry = (event) => {
    const currCountry = event.target.value
    if (currCountry.length >= 1) {
      const tempCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(currCountry.toLowerCase()))
      if (tempCountries.length > 10) {
        setTooMany('Too many matches, specify another filter')
        setNewCountries([]) 
        setDisplayData(null)
      } else {
        setTooMany(null)
        setNewCountries(tempCountries)
        setDisplayData(null)
        if (tempCountries.length === 1) {
          const lat = tempCountries[0].capitalInfo.latlng[0]
          const lng = tempCountries[0].capitalInfo.latlng[1]
          let weatherData
          axios
            .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=${api_key}`)
            .then(response => {
              console.log(response.data)
              weatherData = response.data
              console.log('temp:', weatherData.current.temp)
              return weatherData
            })
            .then(response => {
              setDisplayData({...tempCountries[0], temp: response.current.temp})
              const icon = response.current.weather[0].icon
              axios
                .get(`https://openweathermap.org/img/wn/${icon}@2x.png`, {
                  responseType: 'arraybuffer'})
                .then(raw => {
                  const base64 = Buffer.from(raw.data, 'binary').toString('base64')
                  let image = `data:${raw.headers["content-type"]};base64,${base64}`
                  console.log('displayData is', displayData)
                  setDisplayData({...tempCountries[0], temp: response.current.temp, image: image, windSpeed: response.current.wind_speed})
                })
            })
          setNewCountries([])
          console.log('set DisplayData')
        }
      }
    } else {
      setTooMany(null)
      setDisplayData(null)
    }
  }

  const showCountry = (country) => {
    const lat = country.capitalInfo.latlng[0]
    const lng = country.capitalInfo.latlng[1]
    let weatherData
    axios
      .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=${api_key}`)
      .then(response => {
        console.log(response.data)
        weatherData = response.data
        console.log('temp:', weatherData.current.temp)
        return weatherData
      })
      .then(response => {
        setDisplayData({...country, temp: response.current.temp})
        const icon = response.current.weather[0].icon
        axios
          .get(`https://openweathermap.org/img/wn/${icon}@2x.png`, {
            responseType: 'arraybuffer'})
          .then(raw => {
            const base64 = Buffer.from(raw.data, 'binary').toString('base64')
            let image = `data:${raw.headers["content-type"]};base64,${base64}`
            console.log('displayData is', displayData)
            setDisplayData({...country, temp: response.current.temp, image: image, windSpeed: response.current.wind_speed})
          })
      })
    //setDisplayData(country)
  }

  return (
    <div>
      find countries
      <input onChange={searchCountry}></input>
      {newCountries.map(country => {
        return (<div key={country.name.common}>{country.name.common}
        <Show country={country} showCountry={showCountry}/>
        </div>)
      })}
      <div>{tooMany}</div>
      <Display displayData={displayData}/>
    </div>
  );
}

export default App;
