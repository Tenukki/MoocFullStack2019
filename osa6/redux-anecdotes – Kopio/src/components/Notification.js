import React from 'react'
import { setMessageAction } from '../reducers/notificationReducer';

const Notification = ({store}) => {
  const word = store.getState().notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(word===""){
    return (
      <>
      </>
    )
  }else{
    return (
      <div style={style}>
        {word}
      </div>
    )
  }
  
}

export default Notification