import React from 'react'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import { setMessageAction } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) =>{

    const addvote = (anecdote) => {
      props.voteAnecdote(anecdote)
      setTimeout(()=>{
        props.setMessageAction("")        
      },5000)
        props.setMessageAction(anecdote.content)
    }
 
    return (
        <div>
          {props.anecdotesToShow
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

const anecdotesToShow = ({ anecdote, filter }) => {
  console.log("tämä")
  console.log(anecdote)
  return anecdote.sort((a,b)=>b.votes - a.votes).filter(anecdotes => anecdotes.content.includes(filter))
}

const mapStateToProps = (state) => {
  return {
    anecdote: state.anecdote,
    filter: state.filter,
    anecdotesToShow: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setMessageAction
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

