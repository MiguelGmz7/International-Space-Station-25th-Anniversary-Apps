import React from 'react'
import julietaFullBody from '../assets/Customize/JulietaFullBody.png'
import globeImg from '../assets/Customize/Globo.png'
import bookImg from '../assets/Customize/Libro.png'
import starImg from '../assets/Customize/Star.png'

function ISSModal({
  globeApplied,
  setGlobeApplied,
  bookApplied,
  setBookApplied,
  starApplied,
  setStarApplied,
  onClose,
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" aria-label="Cerrar" onClick={onClose}>×</button>
        <div
          className={`modal-body ${starApplied ? 'star-bg' : ''}`}
          style={starApplied ? { backgroundImage: `url(${starImg})` } : undefined}
        >
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

          {/* Estrella debajo del libro: alterna el fondo del modal */}
          <img
            src={starImg}
            alt="Estrella"
            className="modal-star"
            onClick={() => setStarApplied((v) => !v)}
          />

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
  )
}

export default ISSModal