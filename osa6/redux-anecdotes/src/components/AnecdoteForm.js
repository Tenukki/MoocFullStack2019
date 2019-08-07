import React from 'react'
import {addAnecdote} from '../reducers/anecdoteReducer'

const AnecdoteForm = ({store}) =>{
    const addnew = (event) => {
        event.preventDefault()
        const content = event.target.field.value
        store.dispatch(addAnecdote(content))
        //tämä asettaa kentän tyhjäksi
        event.target.field.value = ''
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addnew}>
            <div><input name="field" /></div>
            <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm