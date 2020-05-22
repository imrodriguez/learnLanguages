import React from 'react'
import { WordWrapper } from './Word.styles';

export default (props) => (
  <WordWrapper>
    <h2>Say that word on the microphone:</h2>
    <p>{props.word}</p>
  </WordWrapper>
)
