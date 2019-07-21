import React, { Component,useState,useEffect } from 'react';
import Connect from './connect'
import Axios from 'axios';

/*

Axios.get(`http://api.apixu.com/v1/current.json?key=47a729f6a11d4850982101236190604&q=${taul[0].name}?`).then(response => {
          console.log(response.data.location.country)
          setSaa(response.data)
          
        })


        h1>Weather in Helsinki</h1>
      <p>temperature: {}</p>
      <img src={saaTaul[0].current.condition.icon} alt="kuva"/>
      <p>wind: </p>

 const saa = {}
  


        */       
const Country = (props) => {
  const maaObject = [...props.taulukko]
  const [saa,setSaa] = useState({})
  const [wait,setWait] = useState(false)
  useEffect(() => {
    Axios.get(`http://api.apixu.com/v1/current.json?key=47a729f6a11d4850982101236190604&q=${maaObject[0].name}?`).then(response => {
      console.log('promise fulfilled Sää')
      //console.log(response.data)
      setSaa(response.data)
      setWait(true)
    })
  },[])
  console.log(saa)
  let styles = {
    width: "100px",
    height: "50px"
  }

  let styles2 = {
    width: "500px",
    height: "250px"
  }
  if(wait){
    return (
      <>
        <h1>{maaObject[0].name}</h1>
        <p>capital {maaObject[0].capital}</p>
        <p>population {maaObject[0].population}</p>
        <h2>languages</h2>
        <div>
          <ul>
            {maaObject[0].languages.map(kieli => <li key = {kieli.iso639_1}>{kieli.name}</li>)}
          </ul>
        </div>
        <img src={maaObject[0].flag} alt="kuva" style={styles2}/>
      <h1>Weather in Helsinki</h1>
      <h4>temperature: {saa.current.temp_c} Celsius</h4>
      <img src={saa.current.condition.icon} alt="kuva" style={styles}/>
      <h4>wind: {saa.current.wind_kph} kph direction {saa.current.wind_dir}</h4>
      </>
    )
  }else{
    return <></>
  }
  
  }

const App = () => {
  const [name, setName] = useState("");
  const [maat, setMaat] = useState([])
   


  console.log(maat)
  useEffect(() => {
    Connect
      .getAll().then(objects => {
        console.log(objects)
        console.log('promise fulfilled')
        setMaat(objects)
      })

  }, [])

  


  const setSearch = (event) => {
    console.log("tekstikentän teksti",name)
    setName(event.target.value)
  }

  const printCountries = (maat) => {
      //filteröidään maat joissa esiintyy tietty merkkijono
      const taul = maat.filter(object => object.name.toUpperCase().includes(name.toUpperCase(),0))
      console.log(taul)
      if(taul.length > 10){
        return(
          <p>Too many matches, specify another filter</p>
        )
      }else{
        return (
          <>
            <PrintCountrieName maa = {taul}/>
          </>
        )
      }
    }

  const testi = (maa) =>{
    console.log(maa.name)
    setName(maa.name)
  }

  const PrintCountrieName = ({maa}) => {
    const countrie = [...maa]
    if(maa.length === 1){
      return (
        <>
          <Country taulukko = {countrie}/>
        </>
      )
    }else{
      return (maa.map(asia => {
        console.log(asia)
        return  (
          <>
            <p key = {asia.name}>{asia.name} <button onClick={()=>testi(asia)}>Show</button></p> 
          </>
        )
        
      }))
    }
  }

  return (
    <div>
      find countries<input type="text" value = {name} onChange = {setSearch}/>
      {printCountries(maat)}
    </div>
  )

}

export default App;
