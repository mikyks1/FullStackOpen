const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    const style = {
        color: "blue",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "10px",
        padding: "10px",
        marginBottom: "10px",
        width: "max-content",
    }

    return (
        <div style={style}>
            {notification}
        </div>
    )
}

export default Notification