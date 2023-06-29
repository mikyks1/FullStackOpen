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

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>
      <Feedback Good={incrementGood} Neutral={incrementNeutral} Bad={incrementBad} />
      <h1>Statistiikka</h1>
      <p>Hyvä {good}</p>
      <p>Neutraali {neutral}</p>
      <p>Huono {bad}</p>
    </div>
  );
}

export default App;
