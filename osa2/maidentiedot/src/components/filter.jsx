const Filter = ({ filter, handler }) => {
    return (
        <div>
            Find a country: <input value={filter} onChange={handler} />
        </div>
    )
}

export default Filter