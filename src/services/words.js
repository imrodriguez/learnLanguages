import words from '../data/words.json'

const getRandomWord = () => {
    return words.words[Math.floor(Math.random() * words.words.length)]
}

export default getRandomWord