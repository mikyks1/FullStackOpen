import Country from "./country"
import ListedCountry from "./listedCountry"

const Countries = ({ countries, filter, handler }) => {
    const filteredCountries = filter
        ? countries.filter(country => country.name.official.toLowerCase().includes(filter.toLowerCase()))
        : countries

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
                {filteredCountries.map(country => <ListedCountry key={country.name.common} country={country} handler={handler} />)}
            </div>
        )

    if (length != 0) {
        return (
            <Country country={filteredCountries[0]}></Country>
        )
    }
}

export default Countries