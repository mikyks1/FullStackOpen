import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Feedback = ({ Good, Neutral, Bad }) => {
  return (
    <div>
      <h1>Anna palautetta</h1>
      <Button handleClick={Good} text="Hyvä" />
      <Button handleClick={Neutral} text="Neutraali" />
      <Button handleClick={Bad} text="Huono" />
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
      <Feedback Good={incrementGood} Neutral={incrementNeutral} Bad={incrementBad} />
      <h1>Statistiikka</h1>
      <p>Hyvä {good}</p>
      <p>Neutraali {neutral}</p>
      <p>Huono {bad}</p>
      <p>Yhteensä {total}</p>
      <p>Keskiarvo {average}</p>
      <p>Positiivisuus {positive}%</p>
    </div>
  );
}

export default App;
