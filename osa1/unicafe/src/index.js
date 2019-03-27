import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (probs) =>{
    return(
        <div>
            <button onClick = {probs.paina}>
               {probs.text}
            </button>
        </div>
    )
  }

  const Statistics = (props) => {
        return (
            <tr>
                <td>{props.text}</td>
                <td>{props.tieto}</td>
            </tr>
        )

  }

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [keski, setKeski] = useState([])
  const [yht, setYht] = useState(0)
  const [sumKeski, setSumKeski] = useState([])


  const klik = (a) =>{
      setYht(yht + 1)
      if(a === "g"){
        setGood(good + 1)
        setKeski(keski.concat(1))
        setSumKeski(sumKeski.concat(1))
      } 
      else if(a === "n"){
        setNeutral(1+neutral)
        setKeski(keski.concat(0))
      }else if(a === "b"){
        setBad(1+bad)
        setKeski(keski.concat(-1))
      }
  }

  const keskiarvo = () => {
    let summa = 0
    keski.forEach(element => {
        summa += element
      });

      return summa === 0 ? 0 : summa/yht 
  }

  const sumkeskiarvo = () => {
    let summa = 0
    sumKeski.forEach(element => {
        summa += element
      });

      return summa === 0 ? 0 : summa/yht * 100
  }

  

  return (
    <div>
        <Button text = {"hyvä"} paina = {() => klik("g")}/>
        <Button text = {"neutraali"} paina = {() =>klik("n")}/>
        <Button text = {"huono"} paina = {() => klik("b")}/>
        <h1>statistiikka</h1>
        <></>
        
        <table>
            <tbody>
                <Statistics text = {"hyvä"} tieto = {good} />
                <Statistics text = {"neutraali"} tieto = {neutral} />
                <Statistics text = {"huono"} tieto = {bad} />
                <Statistics text = {"yhteensä"} tieto = {yht} />
                <Statistics text = {"keskiarvo"} tieto = {keskiarvo()} />
                <Statistics text = {"positiivisia"} tieto = {sumkeskiarvo()} />
            </tbody>
        
        </table>
       
        

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
