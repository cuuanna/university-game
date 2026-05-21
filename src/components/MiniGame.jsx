import { useState, useEffect } from 'react'
import data from '../universities.json'

function MiniGame() {
  const [universities, setUniversities] = useState([])
  const [question, setQuestion] = useState(null)
  const [options, setOptions] = useState([])
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(0)

  useEffect(() => {
    setUniversities(data)
  }, [])

  useEffect(() => {
    if (universities.length > 0) generateQuestion()
  }, [universities])

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
            {option}
          </button>
        ))}
      </div>
      {selected && (
        <div className="result">
          <p>{selected === question.country ? 'Rätt svar!' : `Fel svar! Det var ${question.country}`}</p>
          <button onClick={generateQuestion}>Nästa fråga</button>
        </div>
      )}
    </div>
  )
}

export default MiniGame