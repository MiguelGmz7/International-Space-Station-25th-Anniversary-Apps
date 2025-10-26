import React, { useEffect, useState } from 'react'
import popup6 from '../assets/PopUps/6.jpg'
import julietaImg from '../assets/nave/Julieta.gif'

function Star6Content() {
  const message = 'Experience being in the Cupola.'
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    setTypedText('')
    let i = 0
    const typeInterval = setInterval(() => {
      i += 1
      setTypedText(message.slice(0, i))
      if (i >= message.length) {
        clearInterval(typeInterval)
      }
    }, 30)
    return () => clearInterval(typeInterval)
  }, [])

  const handleOpenExperience = () => {
    window.open('project/ksp.html', '_blank', 'noopener,noreferrer')
  }

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
          backgroundImage: `url(${popup6})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
          border: '6px solid rgba(255,255,255,0.85)',
          boxSizing: 'border-box'
        }} />

        {/* Mensaje estilo chat y botón de experiencia */}
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
          <div className="pixel-bubble" style={{ position: 'relative', bottom: 'auto', right: 'auto' }}>
            <div className="bubble-text" style={{ fontFamily: 'Press Start 2P, system-ui, sans-serif', fontSize: '10px', lineHeight: 1.35 }}>
              <span style={{ color: '#00ff7f' }}>&gt; </span>
              <span>{typedText}</span>
              <span className="cursor" style={{ display: 'inline-block', width: '8px', height: '1em', backgroundColor: '#00ff7f', marginLeft: '2px', animation: 'blink 1s step-start infinite' }} />
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpenExperience}
            style={{
              padding: '8px 12px',
              fontFamily: 'Press Start 2P, system-ui, sans-serif',
              fontSize: '10px',
              backgroundColor: '#1e90ff',
              color: '#fff',
              border: '2px solid rgba(255,255,255,0.85)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.30)',
              cursor: 'pointer'
            }}
            aria-label="Open immersive experience"
          >
            Immersive Experience
          </button>
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

export default Star6Content