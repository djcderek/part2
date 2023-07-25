import { useState } from "react"
import { useEffect } from "react"
import axios from 'axios'

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
    </div>
  )
}

function App() {
  const [newCountries, setNewCountries] = useState([])
  const [tooMany, setTooMany] = useState(null)
  const [allCountries, setAllCountries] = useState([])
  const [displayData, setDisplayData] = useState(null)

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
          setDisplayData(tempCountries[0])
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
    setDisplayData(country)
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
