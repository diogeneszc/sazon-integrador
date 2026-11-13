function FiltrosReportes({
  filtros,
  filtroActivo,
  conteos,
  total,
  busqueda,
  onCambiarFiltro,
  onCambiarBusqueda,
  onExportar,
}) {
  const cantidadFiltro = (id) => {
    if (id === 'todos') return total
    if (id === 'bloqueado') return conteos.bloqueado
    return conteos[id]
  }

  return (
    <div className="flex flex-col gap-3 border-b border-slate-200 p-4 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar reportes por estado">
        {filtros.map((filtro) => {
          const activo = filtroActivo === filtro.id
          return (
            <button
              key={filtro.id}
              type="button"
              role="tab"
              aria-selected={activo}
              onClick={() => onCambiarFiltro(filtro.id)}
              className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-[11px] transition-colors ${
                activo
                  ? 'border-sazon-verdeHoja bg-sazon-verdeHoja font-bold text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-sazon-verdeHoja/50 dark:border-white/10 dark:bg-sazon-verdeNutresaCard dark:text-slate-200'
              }`}
            >
              <span>{filtro.label}</span>
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${activo ? 'bg-white/20' : 'bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-300'}`}>
                {cantidadFiltro(filtro.id)}
              </span>
            </button>
          )
        })}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 dark:border-white/15 dark:bg-sazon-verdeNutresa">
          <i className="bi bi-search text-slate-400" aria-hidden="true"></i>
          <span className="sr-only">Buscar por ID, autor, contenido, receta o marca</span>
          <input
            type="search"
            value={busqueda}
            onChange={(evento) => onCambiarBusqueda(evento.target.value)}
            placeholder="Filtrar por ID, autor, receta"
            className="min-w-0 flex-1 border-0 bg-transparent py-2 text-xs text-slate-800 outline-none placeholder:text-slate-400 dark:text-white sm:w-52"
          />
        </label>
        <button
          type="button"
          onClick={onExportar}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-700 transition hover:border-sazon-verdeHoja hover:text-sazon-verdeHondo dark:border-white/15 dark:bg-sazon-verdeNutresa dark:text-slate-200 dark:hover:text-sazon-verdeNeon"
        >
          <i className="bi bi-download"></i>
          CSV
        </button>
      </div>
    </div>
  )
}

export default FiltrosReportes
