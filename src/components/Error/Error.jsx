import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'
import { faChrome } from '@fortawesome/free-brands-svg-icons'

export default (props) => {
  switch (props.error.type) {
    case 'permission':
      return (
        <div>
          <FontAwesomeIcon icon={faMicrophone}/>
          <h2>This application needs the microphone permission.</h2>
        </div>
      )
    case 'browser':
      return (
        <div>
          <FontAwesomeIcon icon={faChrome}/>
          <h2>Seems like your browser isn't compatible with this technology, try with Chrome web browser.</h2>
        </div>
      )
  }
}
