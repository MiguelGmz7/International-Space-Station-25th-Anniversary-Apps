import React, { useEffect, useState } from 'react'
import popup5 from '../assets/PopUps/5.jpg'
import julietaImg from '../assets/nave/Julieta.gif'

function Star5Content() {
  const messages = [
    'How do they go to the bathroom?',
    'Locations: Node 3',
    'Without gravity, wastes are guided by airflow instead of water.',
    'Astronauts use specialized toilets with restraints and airflow to collect and treat wastes.'
  ]

  const [currentMsgIndex, setCurrentMsgIndex] = useState(0)
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    const fullText = messages[currentMsgIndex] || ''
    setTypedText('')
    let i = 0
    const typeInterval = setInterval(() => {
      i += 1
      setTypedText(fullText.slice(0, i))
      if (i >= fullText.length) {
        clearInterval(typeInterval)
        // Pausa al terminar una línea antes de pasar a la siguiente
        setTimeout(() => {
          if (currentMsgIndex < messages.length - 1) {
            setCurrentMsgIndex(currentMsgIndex + 1)
          }
        }, 800)
      }
    }, 30) // velocidad de tipeo

    return () => clearInterval(typeInterval)
  }, [currentMsgIndex])

  return (
    <>
      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* Fondo con borde */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${popup5})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
          border: '6px solid rgba(255,255,255,0.85)',
          boxSizing: 'border-box'
        }} />

        {/* Mensaje estilo chat en esquina inferior derecha */}
        <div style={{
          position: 'absolute',
          bottom: 64,
          right: 128,
          zIndex: 10,
          display: 'flex',
          alignItems: 'flex-end',
          gap: '12px',
          maxWidth: '60%',
          flexWrap: 'wrap'
        }}>
          {/* Burbuja del mensaje con efecto de terminal */}
          <div className="pixel-bubble" style={{ position: 'relative', bottom: 'auto', right: 'auto' }}>
            <div className="bubble-text" style={{ fontFamily: 'Press Start 2P, system-ui, sans-serif', fontSize: '10px', lineHeight: 1.35 }}>
              <span style={{ color: '#00ff7f' }}>&gt; </span>
              <span>{typedText}</span>
              <span className="cursor" style={{ display: 'inline-block', width: '8px', height: '1em', backgroundColor: '#00ff7f', marginLeft: '2px', animation: 'blink 1s step-start infinite' }} />
            </div>
          </div>
        </div>

        {/* Avatar circular fijo abajo a la derecha */}
        <div style={{ position: 'absolute', bottom: 8, right: 8, zIndex: 10 }}>
          <div style={{
            width: 100,
            height: 100,
            aspectRatio: '1 / 1',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid rgba(255,255,255,0.85)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.30)',
            backgroundImage: `url(${julietaImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }} />
        </div>
      </div>
    </>
  )
}

export default Star5Content