/**
 * Imagen de plato con respaldo visual cuando no hay foto disponible.
 */
function ImagenPlato({ src, alt = '', className = '', children }) {
  return (
    <figure className={`relative overflow-hidden m-0 ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
      ) : (
        <span
          className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-200 via-orange-300 to-red-400 dark:from-amber-900 dark:via-orange-900 dark:to-red-950 text-white/90"
          role="img"
          aria-label={alt || 'Foto del plato'}
        >
          <i className="bi bi-egg-fried text-4xl drop-shadow"></i>
        </span>
      )}
      {children}
    </figure>
  )
}

export default ImagenPlato
