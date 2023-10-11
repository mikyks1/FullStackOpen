const ListedCountry = ({ country, handler }) => (
    <div>
        {country.name.common}
        <button onClick={() => handler(country.name.official)}>Show</button>
    </div>
)

export default ListedCountry