import React, { Component,useState,useEffect } from 'react';
import Connect from './connect'


const Country = ({maaObject}) => {
  return (
    <>
      <h1>{maaObject.name}</h1>
      <h1>""</h1>
      <p>{maaObject.population}</p>
      <h2>languages</h2>
      <ul>
      <Languages maaObject = {maaObject}/>
      </ul>
      <img src={maaObject.flag} alt="kuva"/>
    </>
  )
}

const Languages = ({maaObject}) => {
    return (
      maaObject.languages.map(element => {
        return <li>{element.name}</li>
      })
    ) 
}


const App = () => {
  const [name, setName] = useState("");
  const [maat,setMaat] = useState([])
  
  useEffect(() => {
    Connect
      .getAll().then(objects => {
        console.log(objects)
        console.log('promise fulfilled')
        setMaat(objects)
        console.log(maat)
      })
  }, [])
  
  const setSearch = (event) => {
    console.log(name)
    setName(event.target.value)
  }

  const printCountries = () => {
    console.log(maat)
  }

  

  return (
    <div>
      find countries<input type="text" value = {name} onChange = {setSearch}/>
    </div>
  )

}

export default App;
