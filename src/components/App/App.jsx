import React, { useState, useEffect } from 'react'
import Error from '../Error'
import Result from '../Result'
import Word from '../Word'
import { Wrapper } from '../../styles/global'
import words from '../../services/words'

export default (props) => {
  const [word, setWord] = useState('hello')
  const [result, setResult] = useState()
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState({ error: false })

  useEffect(() => {
    setWord(words)
  }, [])

  useEffect(() => {
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

    if (window.SpeechRecognition !== undefined) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .catch(function (err) {
          setError({ error: true, type: 'permission' })
        })
      listen()
    } else {
      setError({ error: true, type: 'browser' })
    }
  }, [word])

  const listen = () => {
    const recognition = new window.SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 10;

    let finalTranscript = '';
    recognition.onresult = (event) => {
      for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
        let transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        }
      }

      setAnswer(finalTranscript)

      if (String(word).toLowerCase() === String(finalTranscript).toLowerCase()) {
        setResult(true)
        recognition.stop()
      } else {
        setResult(false)
        recognition.stop()
      }
    }
    recognition.start()
  }

  if (error.error) {
    return (
      <Wrapper>
        <Error error={error} />
      </Wrapper>
    )
  }

  if (result !== undefined) {
    return (
      <Wrapper>
        <Result result={result} answer={answer}/>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Word word={word} />
      <p>{answer}</p>
    </Wrapper>
  )

}
