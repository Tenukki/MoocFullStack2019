import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const part1 = 'Reactin perusteet'
  const exercises1 = 10
  const part2 = 'Tiedonvälitys propseilla'
  const exercises2 = 7
  const part3 = 'Komponenttien tila'
  const exercises3 = 14

 const Header = (probs) =>{
    return(
        <div>
            <h1>{probs.nimi}</h1>
        </div>
    )
 }

 const Content = (probs) =>{
    return(
        <div>
            <Part nimi = {probs.nimi1} maara = {probs.maara1}/>
            <Part nimi = {probs.nimi2} maara = {probs.maara2}/>
            <Part nimi = {probs.nimi3} maara = {probs.maara3}/>
        </div>
    )
 }

 const Part = (probs) =>{
    return(
        <div>
            <p>{probs.nimi} {probs.maara}</p>
        </div>
    )
 }

 const Total = (probs) =>{
    return(
        <div>
            <p>Yhteensä {probs.summa} tehtävää</p>
        </div>
    )
 }


  return (
    <div>
      <Header nimi = {course}/>
      <Content nimi1 = {part1} maara1 = {exercises1} nimi2 = {part2} maara2 = {exercises2} nimi3 = {part3} maara3 = {exercises3}/>
      <Total summa = {exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))