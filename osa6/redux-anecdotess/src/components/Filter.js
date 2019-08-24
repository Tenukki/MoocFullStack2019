import React from 'react'
import { setFilterAction } from '../reducers/filterReducer'
import { connect } from 'react-redux'
 
const Filter = ({setFilterAction}) => {
  
  const handleChange = (event) => {
    let word = event.target.value
    setFilterAction(word)
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

export default connect(
  null,
  {setFilterAction}

)(Filter)