import { useState, useEffect } from 'react'
import data from '../universities.json'

function MiniGame() {
  const [universities, setUniversities] = useState([])
  const [question, setQuestion] = useState(null)
  const [options, setOptions] = useState([])
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(0)
  const [dogImage, setDogImage] = useState(null)
  const [dogBreed, setDogBreed] = useState('')
  const [dogError, setDogError] = useState('')

  useEffect(() => {
    setUniversities(data)
  }, [])

  useEffect(() => {
    if (universities.length > 0) generateQuestion()
  }, [universities])

  function translateCountry(countryName) {
    const uni = universities.find(u => u.country === countryName)
    if (!uni) return countryName
    try {
      const regionNames = new Intl.DisplayNames(['sv'], { type: 'region' })
      return regionNames.of(uni.alpha_two_code) || countryName
    } catch {
      return countryName
    }
  }

  function generateQuestion() {
    setSelected(null)
    const random = universities[Math.floor(Math.random() * universities.length)]
    setQuestion(random)

    const wrongCountries = []
    while (wrongCountries.length < 3) {
      const r = universities[Math.floor(Math.random() * universities.length)]
      if (r.country !== random.country && !wrongCountries.includes(r.country)) {
        wrongCountries.push(r.country)
      }
    }

    const allOptions = [...wrongCountries, random.country].sort(() => Math.random() - 0.5)
    setOptions(allOptions)
    setRound(prev => prev + 1)
  }

  function handleGuess(country) {
    setSelected(country)
    if (country === question.country) setScore(prev => prev + 1)
  }

  async function fetchDog() {
    setDogImage(null)
    setDogBreed('')
    setDogError('')
    try {
      const breedsRes = await fetch('https://dog.ceo/api/breeds/list/all')
      const breedsData = await breedsRes.json()
      const breeds = Object.keys(breedsData.message)
      const randomBreed = breeds[Math.floor(Math.random() * breeds.length)]

      const imageRes = await fetch(`https://dog.ceo/api/breed/${randomBreed}/images/random`)
      const imageData = await imageRes.json()

      setDogBreed(randomBreed)
      setDogImage(imageData.message)
    } catch (error) {
      setDogError('Kunde inte hämta en hund just nu, försök igen!')
      console.log('Något gick fel:', error)
    }
  }

  if (!question) return <p className="loading">Laddar universitet...</p>

  return (
    <div className="game">
      <h1>Gissa universitetslandet!</h1>
      <p className="score">Poäng: {score} / {round - 1}</p>
      <div className="university-card">
        <h2>{question.name}</h2>
        <p className="domain">{question.domains[0]}</p>
      </div>
      <div className="options">
        {options.map(option => (
          <button
            key={option}
            onClick={() => handleGuess(option)}
            disabled={selected !== null}
            className={
              selected
                ? option === question.country
                  ? 'correct'
                  : option === selected
                  ? 'wrong'
                  : ''
                : ''
            }
          >
            {translateCountry(option)}
          </button>
        ))}
      </div>
      {selected && (
        <div className="result">
          <p>
            {selected === question.country
              ? 'Rätt svar!'
              : `Fel svar! Det var ${translateCountry(question.country)}`}
          </p>
          <button onClick={generateQuestion}>Nästa fråga</button>
        </div>
      )}

      <div className="dog-section">
        <p>Behöver du en paus? Se en slumpmässig hund!</p>
        <button onClick={fetchDog}>Visa hund</button>
        {dogError && <p className="error">{dogError}</p>}
        {dogBreed && <p className="dog-breed">Ras: <strong>{dogBreed}</strong></p>}
        {dogImage && <img src={dogImage} alt={dogBreed} className="dog-image" />}
      </div>
    </div>
  )
}

export default MiniGame