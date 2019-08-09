import React from 'react'
import { setFilterAction } from '../reducers/filterReducer'
 
const Filter = ({store}) => {
  
  const handleChange = (event) => {
    let word = event.target.value
    store.dispatch(setFilterAction(word))
    console.log(word)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter