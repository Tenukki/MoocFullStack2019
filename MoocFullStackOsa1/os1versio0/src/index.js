import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = 'Half Stack -sovelluskehitys'
    const part1 = {
      name: 'Reactin perusteet',
      exercises: 10
    }
    const part2 = {
      name: 'Tiedonvälitys propseilla',
      exercises: 7
    }
    const part3 = {
      name: 'Komponenttien tila',
      exercises: 14
    }

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
      <Content nimi1 = {part1.name} maara1 = {part1.exercises} nimi2 = {part2.name} maara2 = {part2.exercises} nimi3 = {part3.name} maara3 = {part3.exercises}/>
      <Total summa = {part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))




