import React, { PureComponent } from 'react';

class Word extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: { flag: false, message: '' },
      word: '',
      result: '',
      answer: ''
    };
  }

  getWord() {
    let self = this;
    fetch('https://random-word-api.herokuapp.com/word?key=WTAXQB52&number=1')
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        self.setState({word: myJson});
      });
  }

  checkMicrophone() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .catch(function (err) {
        this.setState({ hasError: { flag: true, message: 'permiso' } });
      });
  }

  checkCompatibility() {
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

    if ('SpeechRecognition' in window) {
      return true;
    } else {
      this.setState({ flag: true, message: 'Not compatible' });
      return false;
    }
  }

  listenWords() {
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

      console.log(finalTranscript);
      if (String(this.state.word).toLowerCase() === String(finalTranscript).toLowerCase()) {
        this.setState({ answer: true });
      } else {
        this.setState({ answer: false });
      }
    }
    recognition.start();
  }

  componentDidMount = () => {
    // Get random Word
    this.getWord();
    // Check if microphone is active on browser
    this.checkMicrophone();

    // Check if browser is compatible with speech recognition
    if (this.checkCompatibility()) {
      // Let's do it
      this.listenWords();
    }
  }

  checkAnswer() {
    if (this.state.answer === true) {
      return (<p>VERDADERO</p>);
    } else if (this.state.answer === false) {
      return (<p>FALSO</p>);
    }
  }

  render() {
    if (this.state.hasError.flag) {
      return <h1>{this.state.hasError.message}</h1>;
    }
    return (
      <div className="WordWrapper">
        <p>{this.state.word}</p>
        {this.checkAnswer()}
      </div>
    );
  }
}

export default Word;
