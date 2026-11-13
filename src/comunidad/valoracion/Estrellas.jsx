import { useState } from 'react'

/**
 * Muestra una calificación con estrellas (soporta medias estrellas).
 * Si recibe `onChange` se vuelve interactiva (hover + clic + teclado).
 */
function Estrellas({ valor = 0, max = 5, tamano = 'text-base', onChange, className = '' }) {
  const [hover, setHover] = useState(0)
  const interactiva = typeof onChange === 'function'
  const mostrado = interactiva && hover ? hover : valor

  const iconoPara = (posicion) => {
    if (mostrado >= posicion) return 'bi-star-fill'
    if (mostrado >= posicion - 0.5) return 'bi-star-half'
    return 'bi-star'
  }

  if (!interactiva) {
    return (
      <span
        className={`inline-flex items-center gap-0.5 text-sazon-verdeNoche dark:text-sazon-verdeNeon ${tamano} ${className}`}
        aria-label={`${valor} de ${max} estrellas`}
        role="img"
      >
        {Array.from({ length: max }, (_, i) => (
          <i key={i} className={`bi ${iconoPara(i + 1)}`}></i>
        ))}
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center gap-2 ${tamano} ${className}`}
      role="radiogroup"
      aria-label="Puntuación general"
      onMouseLeave={() => setHover(0)}
    >
      {Array.from({ length: max }, (_, i) => {
        const posicion = i + 1
        return (
          <button
            key={posicion}
            type="button"
            role="radio"
            aria-checked={valor === posicion}
            aria-label={`${posicion} ${posicion === 1 ? 'estrella' : 'estrellas'}`}
            className="text-sazon-verdeHondo dark:text-sazon-verdeNeon transition-transform duration-150 hover:scale-110 focus-visible:outline-2 focus-visible:outline-sazon-hoja rounded cursor-pointer"
            onMouseEnter={() => setHover(posicion)}
            onClick={() => onChange(posicion)}
          >
            <i className={`bi ${iconoPara(posicion)}`}></i>
          </button>
        )
      })}
    </span>
  )
}

export default Estrellas
