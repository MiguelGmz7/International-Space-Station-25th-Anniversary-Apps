import { useEffect, useState } from 'react'
import './App.css'
import julietaImg from './assets/nave/Julieta.gif'
import julietaFullBody from './assets/Customize/JulietaFullBody.png'
import globeImg from './assets/Customize/Globo.png'
import bookImg from './assets/Customize/Libro.png'

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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [globeApplied, setGlobeApplied] = useState(false)
  const [bookApplied, setBookApplied] = useState(false)

  // Cerrar modal con Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setIsModalOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

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
    setIsModalOpen(true)
    setPlaying(false)
    setShowBubble(false)
    setGlobeApplied(false)
    setBookApplied(false)
  }

  return (
    <>
      <main className="hero" aria-label="Fondo ISS" />

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
        <div className="avatar-inner">
          <img src={julietaImg} alt="Personaje Julieta" />
        </div>
      </div>

      {showBubble && (
        <div className="pixel-bubble">
          <span className="bubble-text">
            {typed}
            <span className="caret" aria-hidden="true">▏</span>
          </span>
        </div>
      )}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" aria-label="Cerrar" onClick={() => setIsModalOpen(false)}>×</button>
            <div className="modal-body">
              <img src={julietaFullBody} alt="Personaje Julieta" className="modal-character" />

              {/* Libro lado izquierdo */}
              {!bookApplied && (
                <img
                  src={bookImg}
                  alt="Libro"
                  className="modal-book"
                  onClick={() => setBookApplied(true)}
                />
              )}

              {/* Globo lado derecho */}
              {!globeApplied && (
                <img
                  src={globeImg}
                  alt="Globo terráqueo"
                  className="modal-globe"
                  onClick={() => setGlobeApplied(true)}
                />
              )}

              {/* Aplicados encima del personaje (misma posición) */}
              {globeApplied && (
                <img
                  src={globeImg}
                  alt="Globo aplicado"
                  className="globe-applied"
                  onClick={() => setGlobeApplied(false)}
                />
              )}
              {bookApplied && (
                <img
                  src={bookImg}
                  alt="Libro aplicado"
                  className="book-applied"
                  onClick={() => setBookApplied(false)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
