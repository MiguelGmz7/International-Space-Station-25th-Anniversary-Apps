import React from 'react'
import popup2 from '../assets/PopUps/2.jpg'
import julietaImg from '../assets/nave/Julieta.gif'

function Star2Content() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Fondo con borde */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${popup2})`,
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
        bottom: 24,
        right: 24,
        zIndex: 10,
        display: 'flex',
        alignItems: 'flex-end',
        gap: '12px',
        maxWidth: '60%',
        flexWrap: 'wrap'
      }}>
        {/* Burbuja del mensaje tipo pixel (como al principio) */}
        <div className="pixel-bubble" style={{ position: 'relative', bottom: 'auto', right: 'auto' }}>
          <div className="bubble-text">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontFamily: 'Press Start 2P, system-ui, sans-serif', fontSize: '12px' }}>Where do they sleep?</div>
              <div style={{ fontSize: '12px', fontWeight: 700 }}>This is the Harmony and Tranquility modules.</div>
              <div style={{ fontSize: '12px', lineHeight: 1.4 }}>
                There is no concept of "down," so astronauts don't feel the pressure of a surface when they sleep. They sleep in small cabins located in the Harmony and Tranquility modules, floating in sleeping bags, to avoid drifting around the station.
              </div>
            </div>
          </div>
        </div>

        {/* Avatar circular a la derecha */}
        <div style={{
          width: 100,
          height: 100,
          aspectRatio: '1 / 1',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid rgba(255,255,255,0.9)',
          boxShadow: '0 6px 12px rgba(0,0,0,0.25)',
          flex: '0 0 auto'
        }}>
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundImage: `url(${julietaImg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
        </div>
      </div>
    </div>
  )
}

export default Star2Content