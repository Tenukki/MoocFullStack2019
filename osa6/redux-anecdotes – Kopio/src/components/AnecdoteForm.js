import React from 'react'
import {addAnecdote} from '../reducers/anecdoteReducer'
import { setMessageAction } from '../reducers/notificationReducer'
const AnecdoteForm = ({store}) =>{
    const addnew = (event) => {
        event.preventDefault()
        const content = event.target.field.value
        store.dispatch(addAnecdote(content))
        //tämä asettaa kentän tyhjäksi
        store.dispatch(setMessageAction("anecdote was created "+content))
        setTimeout(()=>{
            store.dispatch(setMessageAction(""))
            
        },5000)
        event.target.field.value = ''
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

export default AnecdoteForm