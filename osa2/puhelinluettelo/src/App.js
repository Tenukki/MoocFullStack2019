import React, { useState } from 'react'


const Note = (props) => {
  return (
    <>
      <p>{props.nimi} {props.puh}</p>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newPuh, setNewPuh ] = useState('')
  const [ newRaja, setNewRaja ] = useState('')
  
  const rivit = () => persons.filter(sana => sana.name.includes(newRaja)).map(element =>
      
      <Note nimi = {element.name} puh = {element.number}key = {element.name}/>
  )


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePuhChange = (event) => {
    console.log(event.target.value)
    setNewPuh(event.target.value)
  }

  const handleRajaChange = (event) => {
    console.log(event.target.value)
    setNewRaja(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    let a = false;
    persons.forEach(element =>{
      if(element.name === newName){
        a = true
      }
    })
    if(a === false){
      const noteObject = {
        name : newName,
        number : newPuh
      }
    
      setPersons(persons.concat(noteObject))
      setNewName('')
      setNewPuh("")
    }else{
      alert(`${newName} on jo listalla`)
      setNewName("")
      setNewPuh("")
    }
    a = false
    
  }


  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form>
        <div>
          rajaa näytettäviä<input value = {newRaja} onChange = {handleRajaChange}/>
        </div>
      </form>
      <h2>Lisää uusi</h2>
      <form onSubmit = {addName}>
        <div>
          nimi: <input value = {newName} onChange = {handleNameChange}/>
        </div>
        <div>numero: <input value = {newPuh} onChange = {handlePuhChange}/></div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      {rivit()}
    </div>
  )

}

export default App