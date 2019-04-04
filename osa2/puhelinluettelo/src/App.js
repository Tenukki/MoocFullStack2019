import React, { useState, useEffect } from 'react'
import noteService from './connect'

const Note = (props) => {
  return (
    <>
      <p>{props.nimi} {props.puh}
       <button onClick = {props.Poistaklikki}>poista</button>
      </p>
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

  useEffect(() => {
    noteService
      .getAll().then(objects => {
        console.log('promise fulfilled')
        setPersons(objects)
      })
  }, [])

  const poista = (element) => {
    let arvo = window.confirm(`Poistetaanko ${element.name}`)
    if(arvo){
      console.log(element.id)
      noteService.poista(element.id).then(a => {
        console.log("Mitä poistetaan" + a)
        noteService.getAll().then(asia => {
          console.log("asetetaan uudet tiedot"+ asia)
          console.log("Hell" +asia)
          setPersons(asia)
        })

      })
      
    }
    
  }
  
  const rivit = () => {
    console.log("taulukko " + persons)
    return persons.filter(sana => sana.name.includes(newRaja)).map(element =>
        <Note nimi = {element.name} puh = {element.number} key = {element.id} 
        Poistaklikki = {() => poista(element)}
        />
    )
    
  }
    
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
    let id = null;
    persons.forEach(element =>{
      if(element.name === newName){
        a = true
        id = element.id
      }
    })

    if(a === false){
      const noteObject = {
        name : newName,
        number : newPuh
      }
      noteService
      .create(noteObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewPuh("")
        console.log("Menikö se sinne")
      })
    }else{
      const noteObject = {
        name : newName,
        number : newPuh
      }
      let arvo = window.confirm(`${newName} on jo luettelossa korvataanko uudella?`)
      if(arvo){
        noteService.update(id, noteObject).then(asia => {
          noteService.getAll().then(asia => {
            setPersons(asia)
          })
        })
      }else{
        setNewName("")
        setNewPuh("")
      }
      
    }
    a = false
  }

  



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