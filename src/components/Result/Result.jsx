import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export default (props) => (
  <div>
    {props.result === true 
    ? <>
      <FontAwesomeIcon icon={faCheckCircle}/>
      <h2>Very good</h2>
      </>
    : <>
      <FontAwesomeIcon icon={faTimesCircle}/>
      <h2>Oh no! You fail</h2>
      </>
    }
    <p>You said: {props.answer}</p>
  </div>
)