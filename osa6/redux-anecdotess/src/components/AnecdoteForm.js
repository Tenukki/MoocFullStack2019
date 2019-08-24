import React from 'react'
import { connect } from 'react-redux'
import {addAnecdote} from '../reducers/anecdoteReducer'
import { setMessageAction } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = ({addAnecdote,setMessageAction}) =>{
    
    const addnew =  async (event) => {
        event.preventDefault()
        const contenta = event.target.field.value
        event.target.field.value = ''
        addAnecdote({content:contenta,votes:0})
        //ttäälä vika
    
        setMessageAction("anecdote was created "+contenta)
        setTimeout(()=>{
            setMessageAction("")
            
        },5000)
       
    }

    return (
        <div>
            <form onSubmit={addnew}>
            <div><input name="field" /></div>
            <button type="submit">create</button>
            </form>
        </div>
    )
}

export default connect(
    null,
    {addAnecdote,setMessageAction}

  )(AnecdoteForm)