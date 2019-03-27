import React from 'react'
import ReactDOM from 'react-dom'

const Header = (probs) =>{
  return(
      <div>
          <h1>{probs.nimi.name}</h1>
      </div>
  )
}

const Content = (probs) =>{
 const lista = probs.parts
  return(
      <div>
          <Part nimi = {lista.parts[0].name} maara = {lista.parts[0].exercises}/>
          <Part nimi = {lista.parts[1].name} maara = {lista.parts[1].exercises}/>
          <Part nimi = {lista.parts[2].name} maara = {lista.parts[2].exercises}/>
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


const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  }


 const Total = (probs) =>{
   let a = 0;
   const lista = probs.parts.parts
   lista.forEach(element => {
     a += element.exercises
   });
   
    return(
        <div>
            <p>Yhteensä {a} tehtävää</p>
        </div>
    )
 }


  return (
    <div>
      <Header nimi = {course}/>
      <Content parts =  {course}/>
      <Total parts = {course}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))




