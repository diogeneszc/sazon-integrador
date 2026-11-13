import { useEffect, useMemo, useRef, useState } from 'react'

const MAX_MB = 5

function formatoTamano(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function SubirFoto({ archivo, onChange }) {
  const inputRef = useRef(null)
  const [error, setError] = useState('')
  const preview = useMemo(() => (archivo ? URL.createObjectURL(archivo) : null), [archivo])

  useEffect(() => {
    if (!preview) return
    return () => URL.revokeObjectURL(preview)
  }, [preview])

  const manejarSeleccion = (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten imágenes.')
      return
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`La imagen supera ${MAX_MB} MB.`)
      return
    }
    setError('')
    onChange(file)
  }

  return (
    <section className="bg-sazon-marfil dark:bg-sazon-verdeNutresa rounded-xl p-4">
      <header className="flex items-center justify-between mb-3 text-xs">
        <h4 className="font-semibold text-sazon-texto dark:text-slate-200 flex items-center gap-2 m-0">
          <i className="bi bi-image text-base"></i>
          Sube la foto de tu plato (Opcional)
        </h4>
        <span className="font-bold text-sazon-verdeHoja dark:text-sazon-verdeNeon">+50 Pts Comunidad</span>
      </header>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-28 h-20 rounded-lg bg-white/70 dark:bg-white/5 border border-black/5 dark:border-white/10 flex flex-col items-center justify-center gap-1 text-xs text-sazon-texto dark:text-slate-200 hover:bg-white dark:hover:bg-white/10 transition cursor-pointer"
        >
          <i className="bi bi-camera text-xl"></i>
          Examinar
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={manejarSeleccion} />

        {archivo && preview && (
          <div className="flex items-center gap-3 min-w-0">
            <span className="relative">
              <img src={preview} alt="Vista previa" className="w-20 h-20 rounded-lg object-cover shadow" />
              <button
                type="button"
                onClick={() => onChange(null)}
                aria-label="Quitar foto"
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-slate-700 shadow flex items-center justify-center text-sm cursor-pointer"
              >
                <i className="bi bi-x"></i>
              </button>
            </span>
            <span className="text-xs min-w-0">
              <span className="block truncate text-sazon-texto dark:text-slate-200">{archivo.name}</span>
              <span className="text-sazon-texto2 dark:text-slate-400">
                {formatoTamano(archivo.size)} · Listo para moderación
              </span>
            </span>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-sazon-brandZenu mt-2 m-0">{error}</p>}
    </section>
  )
}

export default SubirFoto
