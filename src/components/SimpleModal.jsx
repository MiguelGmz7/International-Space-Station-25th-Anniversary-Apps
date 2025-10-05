import React from 'react'

function SimpleModal({ open, onClose, ariaLabel = 'Modal', children }) {
  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" aria-label="Cerrar" onClick={onClose}>×</button>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  )
}

export default SimpleModal