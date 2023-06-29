import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Feedback = ({ good, neutral, bad }) => {
  return (
    <div>
      <h1>Anna palautetta</h1>
      <Button handleClick={good} text="Hyvä" />
      <Button handleClick={neutral} text="Neutraali" />
      <Button handleClick={bad} text="Huono" />
    </div>
  )
}

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (total) {
    return (
      <div>
        <h1>Statistiikka</h1>
        <p>Hyvä {good}</p>
        <p>Neutraali {neutral}</p>
        <p>Huono {bad}</p>
        <p>Yhteensä {total}</p>
        <p>Keskiarvo {average}</p>
        <p>Positiivisuus {positive}%</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistiikka</h1>
      <h3>Ei annettua palautetta</h3>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const incrementGood = () => {
    const newGood = good + 1
    const newTotal = newGood + neutral + bad
    setGood(newGood)
    setTotal(newTotal)
    setAverage(getAverage({ g: newGood, t: newTotal }))
    setPositive(getPositive({ g: newGood, t: newTotal }))
  }
  const incrementNeutral = () => {
    const newNeutral = neutral + 1
    const newTotal = good + newNeutral + bad
    setNeutral(newNeutral)
    setTotal(newTotal)
    setAverage(getAverage({ t: newTotal }))
    setPositive(getPositive({ t: newTotal }))
  }
  const incrementBad = () => {
    const newBad = bad + 1
    const newTotal = good + neutral + newBad
    setBad(newBad)
    setTotal(newTotal)
    setAverage(getAverage({ b: newBad, t: newTotal }))
    setPositive(getPositive({ t: newTotal }))
  }

  const getAverage = ({ g = good, b = bad, t = total }) => ((g - b) / t).toFixed(2)
  const getPositive = ({ g = good, t = total }) => (g / t * 100).toFixed(2)

  return (
    <div>
      <Feedback good={incrementGood} neutral={incrementNeutral} bad={incrementBad} />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </div>
  );
}

export default App;
