import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import julietaImg from './assets/nave/Julieta.gif'
import SimpleModal from './components/SimpleModal.jsx'
import ISSModal from './components/ISSModal.jsx'
import StarButton from './components/StarButton'
import Star2Content from './components/Star2Content.jsx'
import popup2 from './assets/PopUps/2.jpg'

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
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [typed, setTyped] = useState('')
  const [showBubble, setShowBubble] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fullMessage, setFullMessage] = useState('')
  const [playing, setPlaying] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSimpleOpen, setIsSimpleOpen] = useState(false)
  const [globeApplied, setGlobeApplied] = useState(false)
  const [bookApplied, setBookApplied] = useState(false)
  const [starApplied, setStarApplied] = useState(false)
  const [selectedStarIndex, setSelectedStarIndex] = useState(null)
  const [selectedStarLabel, setSelectedStarLabel] = useState('')

  // Cerrar modal con Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setIsModalOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Your button positions based on original image dimensions
  const originalWidth = 1920; // Set this to your image's original width
  const originalHeight = 1080; // Set this to your image's original height

  const buttonPositions = [
    {x: 1000, y: 225},
    {x: 1098, y: 200},
    {x: 1111, y: 760},
    {x: 1190, y: 475},
    {x: 1045, y: 416},
    {x: 1175, y:420}
    // Add more coordinates as needed
  ];

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
    setStarApplied(false)
  }

  const handleStarClick = (index) => {
    const humanIndex = index + 1;
    console.log(`Star ${humanIndex} clicked!`);
    setSelectedStarIndex(humanIndex);
    setIsSimpleOpen(true);
  };

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        // Calculate scale based on aspect ratio
        const scaleX = containerWidth / originalWidth;
        const scaleY = containerHeight / originalHeight;
        const newScale = Math.min(scaleX, scaleY);

        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

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
      <button style={{position:'fixed', top:20, left:20, zIndex:3000}} onClick={() => window.open('/project/ksp.html', '_blank', 'noopener,noreferrer')}>Inmersive Experience</button>
      {isModalOpen && (
        <ISSModal
          globeApplied={globeApplied}
          setGlobeApplied={setGlobeApplied}
          bookApplied={bookApplied}
          setBookApplied={setBookApplied}
          starApplied={starApplied}
          setStarApplied={setStarApplied}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isSimpleOpen && (
        <SimpleModal open={isSimpleOpen} onClose={() => setIsSimpleOpen(false)} ariaLabel={'Star modal'}>
          {selectedStarIndex === 2 ? (
            <Star2Content />
          ) : (
            <div style={{ width: '100%', height: '100%' }} />
          )}
        </SimpleModal>
      )}

      <div 
        className="buttons-container"
        style={{
          transform: `scale(${scale})`,
        }}
        ref={containerRef}
      >
        {buttonPositions.map((pos, index) => (
          <StarButton
            key={index}
            x={pos.x}
            y={pos.y}
            onClick={() => handleStarClick(index)}
          />
        ))}
      </div>
    </>
  )
}

export default App
