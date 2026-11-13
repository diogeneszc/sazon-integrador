import { useEffect } from 'react'

function DetalleReporteModal({ reporte, onCerrar, onResolver }) {
  useEffect(() => {
    const manejarTecla = (evento) => {
      if (evento.key === 'Escape') onCerrar()
    }
    window.addEventListener('keydown', manejarTecla)
    return () => window.removeEventListener('keydown', manejarTecla)
  }, [onCerrar])

  const campos = [
    ['ID del reporte', reporte.id],
    ['Usuario que reporta', reporte.usuario],
    ['Motivo', reporte.motivo],
    ['Receta relacionada', reporte.receta],
    ['Marca', reporte.marca],
    ['Fecha de reporte', reporte.fecha],
  ]

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/55 p-4 backdrop-blur-sm"
      onMouseDown={(evento) => {
        if (evento.target === evento.currentTarget) onCerrar()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="detalle-reporte-titulo"
        className="my-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-sazon-verdeNutresaCard sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="m-0 text-[10px] font-bold uppercase tracking-wider text-sazon-verdeHoja dark:text-sazon-verdeNeon">
              Revisión de moderación
            </p>
            <h2 id="detalle-reporte-titulo" className="mb-0 mt-1 font-poppins text-xl font-bold text-slate-900 dark:text-white">
              Reporte {reporte.id}
            </h2>
          </div>
          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar detalle"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {campos.map(([etiqueta, valor]) => (
            <div key={etiqueta} className="rounded-xl bg-slate-50 p-3 dark:bg-white/5">
              <p className="m-0 text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">{etiqueta}</p>
              <p className="mb-0 mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">{valor}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/50 dark:bg-amber-400/5">
          <p className="m-0 text-[10px] font-bold uppercase tracking-wide text-amber-800 dark:text-amber-200">
            Contenido denunciado
          </p>
          <p className="mb-0 mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">{reporte.contenido}</p>
        </div>

        {reporte.estado === 'pendiente' ? (
          <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => onResolver(reporte.id, 'bloqueado')}
              className="rounded-xl border border-red-200 px-4 py-2.5 text-xs font-bold text-red-700 transition hover:bg-red-50 dark:border-red-400/30 dark:text-red-200 dark:hover:bg-red-400/10"
            >
              <i className="bi bi-slash-circle mr-2"></i>
              Bloquear contenido
            </button>
            <button
              type="button"
              onClick={() => onResolver(reporte.id, 'aprobado')}
              className="rounded-xl bg-sazon-verdeHoja px-4 py-2.5 text-xs font-bold text-white transition hover:bg-sazon-verdeHondo"
            >
              <i className="bi bi-check-circle mr-2"></i>
              Aprobar reporte
            </button>
          </div>
        ) : (
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={onCerrar}
              className="rounded-xl bg-sazon-verdeHoja px-4 py-2.5 text-xs font-bold text-white transition hover:bg-sazon-verdeHondo"
            >
              Cerrar
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default DetalleReporteModal
