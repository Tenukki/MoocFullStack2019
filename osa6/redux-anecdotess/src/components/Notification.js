import React from 'react'
import { setMessageAction } from '../reducers/notificationReducer';
import { connect } from 'react-redux'

const Notification = ({notification}) => {
  const word = notification
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

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}


export default connect(
  mapStateToProps
)(Notification)
