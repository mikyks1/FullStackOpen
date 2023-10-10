import Country from "./country"

const Countries = ({ countries, filter }) => {
    const filteredCountries = filter
        ? countries.filter(country =>
            country.name.official.toLowerCase().includes(filter.toLowerCase()))
        : countries

    //console.log(filteredCountries)
    const length = filteredCountries.length
    if (length > 10) {
        return (
            <div>
                Too many matches ({length})
            </div>
        )
    }

    if (length > 1)
        return (
            <div>
                {filteredCountries.map(country => <div key={country.name.common}>{country.name.common}</div>)}
            </div>
        )

    if (length != 0) {
        return (
            <Country country={filteredCountries[0]}></Country>
        )
    }
}

export default Countries