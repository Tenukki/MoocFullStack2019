import React from 'react'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import { setMessageAction } from '../reducers/notificationReducer'

const AnecdoteList = ({store}) =>{
    const anecdotes = store.getState().anecdote
    const filter = store.getState().filter
    console.log(filter)
    const addvote = (anecdote) => {
      store.dispatch(voteAnecdote(anecdote))
      
      setTimeout(()=>{
        store.dispatch(setMessageAction(""))
        
      },5000)
      store.dispatch(setMessageAction(anecdote.content))
     
    }
    //
    return (
        <div>
          {anecdotes.sort((a,b)=>b.votes - a.votes)
          .filter(anecdotes => anecdotes.content.includes(filter))
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => addvote(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </div>
      )
}

export default AnecdoteList