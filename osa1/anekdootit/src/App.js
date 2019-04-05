import React, { useState } from 'react';
import './App.css';

const Anekdootti = ({teksti, eventKlikkaus, aania, vote}) => {
  return (
    <div>
      <p>{teksti}</p>
      <p>anekdootilla on {aania} ääntä</p>
      <button onClick = {eventKlikkaus}>seuraava anekdootti</button>
      <button onClick = {vote}>äänestä</button>
    </div>
  )
}

const MostVoted = (props) => {
 
  let indeksi = props.aanetLista.indexOf(Math.max(...props.aanetLista))
  console.log(indeksi)
  return(
    <>
      <p>{props.anekdootit[indeksi]}</p>
      <p>anekdootilla on {props.aanetLista[indeksi]} ääntä</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const [selected, setSelected] = useState(0)
  const [taulukko, setTaulukko] = useState([0,0,0,0,0,0])

  const eventKlikkaus = () => {
    let arpa = Math.floor(Math.random() * Math.floor(6));
    setSelected(arpa)
  }

  const eventAanesta = () => {
    console.log(taulukko)
    console.log(taulukko[selected])

    const uusiTaul = [...taulukko]
    uusiTaul[selected] += 1;
    setTaulukko(uusiTaul)

    console.log(taulukko[selected])
    console.log(taulukko)
  }

    return (
      <div>
        <h1>PÄIVÄN AINEKDOOTTTI</h1>
        <Anekdootti eventKlikkaus = {eventKlikkaus} teksti = {anecdotes[selected]}
         vote = {eventAanesta} aania = {taulukko[selected]}/>
         <h1>ÄÄNESTETYIN ANEKDOOTTI</h1>
        <MostVoted aanetLista = {taulukko} anekdootit = {anecdotes}/>
      </div>
   
    )

  }


export default App;
 