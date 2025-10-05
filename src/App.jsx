import { useEffect, useState } from 'react'
import './App.css'
import julietaImg from './assets/nave/Julieta.gif'
import StarButton from './components/StarButton'

// Párrafos hardcodeados (en inglés) y en orden
const TEXTS = [
  'Hello, I am Julieta Fierro',
  'What is the ISS?',
  'The ISS is the station where our space crew is traveling.'
]

// Configuración
const TYPE_INTERVAL_MS = 60      // velocidad de escritura
const BETWEEN_MESSAGES_MS = 2000 // tiempo visible antes de pasar al siguiente

function App() {
  const [typed, setTyped] = useState('')
  const [showBubble, setShowBubble] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fullMessage, setFullMessage] = useState('')
  const [playing, setPlaying] = useState(false)

  // Inicia la secuencia al montar
  useEffect(() => {
    setPlaying(true)
    setCurrentIndex(0)
  }, [])

  // Cuando cambia el índice o se activa "playing", prepara el mensaje actual
  useEffect(() => {
    if (!playing) return
    if (currentIndex >= TEXTS.length) return
    setFullMessage(TEXTS[currentIndex])
  }, [playing, currentIndex])

  // Efecto de escritura por cada mensaje y avance ordenado
  useEffect(() => {
    let intervalId
    let nextTimerId

    if (playing && fullMessage) {
      setShowBubble(true)
      setTyped('')
      let i = 0
      intervalId = setInterval(() => {
        i += 1
        setTyped(fullMessage.slice(0, i))
        if (i >= fullMessage.length) {
          clearInterval(intervalId)
          nextTimerId = setTimeout(() => {
            const next = currentIndex + 1
            if (next < TEXTS.length) {
              setCurrentIndex(next)
            } else {
              // Fin de la secuencia
              setPlaying(false)
              setShowBubble(false)
              setTyped('')
              setFullMessage('')
              setCurrentIndex(0) // listo para reiniciar
            }
          }, BETWEEN_MESSAGES_MS)
        }
      }, TYPE_INTERVAL_MS)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
      if (nextTimerId) clearTimeout(nextTimerId)
    }
  }, [playing, fullMessage, currentIndex])

  // Reinicia la secuencia al hacer clic en el avatar
  const handleAvatarClick = () => {
    setPlaying(true)
    setCurrentIndex(0)
  }

  const handleStarClick = () => {
    console.log('Star clicked!');
  };

  return (
    <>
      <main className="/* Remove all button styling */hero" aria-label="Fondo ISS" />

      <div
        className="avatar"
        aria-label="Avatar personaje"
        role="button"
        tabIndex={0}
        onClick={handleAvatarClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleAvatarClick()
        }}
      >
        <img src={julietaImg} alt="Personaje Julieta" />
      </div>

      {showBubble && (
        <div className="pixel-bubble">
          <span className="bubble-text">
            {typed}
            <span className="caret" aria-hidden="true">▏</span>
          </span>
        </div>
      )}

      <StarButton 
        onClick={() => handleStarClick(2)}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />
    </>
  )
}

export default App
