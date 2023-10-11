import Weather from "./weather"

const Country = ({ country }) => (
    <div>
        <h1>{country.name.common}</h1>
        <br />
        <div>Capital: {country.capital[0]}</div>
        <div>Population: {country.population}</div>
        <div>Area (km²): {country.area}</div>
        <ul>
            {Object.values(country.languages).map(lang =>
                <li key={lang}>{lang}</li>)}
        </ul>
        <img src={country.flags.png} style={{ border: "3px solid black" }}></img>
        <Weather key={country.capital} coords={country.capitalInfo} capital={country.capital}></Weather>
    </div>
)

export default Country