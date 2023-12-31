import { useEffect } from 'react'
import { useState } from 'react'
import countriesService from "./services/countries"
import Filter from './components/filter'
import Countries from './components/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setNewFilter] = useState("")

  useEffect(() => {
    countriesService
      .getAll()
      .then(countries => setCountries(countries))
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const fillSearch = (country) => {
    setNewFilter(country)
  }

  return (
    <>
      <Filter filter={filter} handler={handleFilterChange}></Filter>
      <Countries countries={countries} filter={filter} handler={fillSearch}></Countries>
    </>
  )
}

export default App
