import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Note = (props) => {
  return (
    <>
      <p>{props.nimi} {props.puh}</p>
    </>
  )
}

const Filter = (props) => {
  return (
    <form>
        <div>
          rajaa näytettäviä<input value = {props.newRaja} onChange = {props.handleRajaChange}/>
        </div>
      </form>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit = {props.addName}>
        <div>
          nimi: <input value = {props.newName} onChange = {props.handleNameChange}/>
        </div>
        <div>numero: <input value = {props.newPuh} onChange = {props.handlePuhChange}/></div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
  )
}

const Numbers = (props) => {
  return props.rivit
}



const App = () => {
  const [persons, setPersons] = useState([])
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

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])



  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter newRaja = {newRaja} handleRajaChange = {handleRajaChange}/>
      <h2>Lisää uusi</h2>
      <PersonForm addName = {addName} newName = {newName} handleNameChange = {handleNameChange}
      newPuh = {newPuh} handlePuhChange = {handlePuhChange}/>
      <h2>Numerot</h2>
      <Numbers rivit = {rivit()}/>
    </div>
  )

}

export default App