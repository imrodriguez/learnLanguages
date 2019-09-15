class Recognition {
    constructor() {
        window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        if ('SpeechRecognition' in window) {
            console.log('supported');
        } else {
            console.log('Not supported');
        }

        this.recognition = new window.SpeechRecognition();
    }

    setLang(lang) {
        this.recognition.lang = lang;
    }

    setMaxAlternatives(num) {
        this.maxAlternatives = num;
    }
}