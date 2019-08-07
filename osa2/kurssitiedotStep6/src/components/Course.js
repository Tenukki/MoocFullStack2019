import React from 'react'

const Header = (probs) =>{
  return(
      <div>
          <h1>{probs.notes.name}</h1>
      </div>
  )
}

const Content = (probs) =>{

  const rivi = () => probs.osa.parts.map(asia =>
    <Part nimi = {asia.name} key={asia.name} maara = {asia.exercises}/>
  )
  return (
    <>
      {rivi()}
    </>
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
 const summa = probs.osa.parts.reduce((s,p) => s +p.exercises,0)
  
   return(
       <div>
           <p>Yhteensä {summa} tehtävää</p>
       </div>
   )
}

const Course = ({ note }) => {

  const kurssi = note.map(elemnent =>
      <div key={elemnent.name}>
      <Header notes = {elemnent}/>
      <Content osa = {elemnent}/>
      <Total osa = {elemnent}/>
      </div>
    )
  return (
    <>
      {kurssi}
    </>
    
  )
}

export default Course