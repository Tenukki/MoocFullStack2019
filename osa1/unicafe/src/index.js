import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const klik = (a) =>{
      if(a === "g")
        setGood(good + 1)
      else if(a === "n"){
        setNeutral(1+neutral)
      }else if(a === "b"){
        setBad(1+bad)
      }
  }

  const Button = (probs) =>{
    return(
        <div>
            <button onClick = {probs.paina}>
               {probs.text}
            </button>
        </div>
    )
  }

  return (
    <div>
        <h1>anna palautetta</h1>
        <Button text = {"hyvä"} paina = {() => klik("g")}/>
        <Button text = {"neutraali"} paina = {() =>klik("n")}/>
        <Button text = {"huono"} paina = {() => klik("b")}/>
      <h1>statistiikka</h1>
        <p>hyvä {good} </p>
        <p>neutraali {neutral}</p>
        <p>huono {bad}</p>
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
