const ESTADOS = {
  pendiente: {
    texto: 'Pendiente',
    clases: 'bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-200',
  },
  aprobado: {
    texto: 'Aprobado',
    clases: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200',
  },
  bloqueado: {
    texto: 'Bloqueado',
    clases: 'bg-red-100 text-red-800 dark:bg-red-400/15 dark:text-red-200',
  },
}

function TablaReportes({
  reportes,
  total,
  pagina,
  totalPaginas,
  inicio,
  onCambiarPagina,
  onAbrirReporte,
}) {
  const inicioVisible = total === 0 ? 0 : inicio + 1
  const finVisible = Math.min(inicio + reportes.length, total)

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead className="bg-slate-50 text-[9px] font-bold uppercase tracking-wider text-slate-600 dark:bg-white/5 dark:text-slate-300">
            <tr>
              <th scope="col" className="px-4 py-3">ID reporte</th>
              <th scope="col" className="px-4 py-3">Usuario reporta</th>
              <th scope="col" className="px-4 py-3">Contenido denunciado</th>
              <th scope="col" className="px-4 py-3">Motivo</th>
              <th scope="col" className="px-4 py-3">Receta / Marca</th>
              <th scope="col" className="px-4 py-3">Fecha / Estado</th>
              <th scope="col" className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/10">
            {reportes.map((reporte) => {
              const estado = ESTADOS[reporte.estado]
              return (
                <tr key={reporte.id} className="text-xs text-slate-700 transition-colors hover:bg-slate-50/80 dark:text-slate-200 dark:hover:bg-white/5">
                  <td className="whitespace-nowrap px-4 py-3 font-mono-tag font-semibold text-slate-500 dark:text-slate-400">
                    {reporte.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-medium">{reporte.usuario}</td>
                  <td className="max-w-56 px-4 py-3">
                    <p className="m-0 line-clamp-2">{reporte.contenido}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-md px-2 py-1 text-[10px] ${reporte.prioridad ? 'bg-red-50 text-red-700 dark:bg-red-400/10 dark:text-red-300' : 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300'}`}>
                      {reporte.motivo}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="block max-w-44 truncate font-medium">{reporte.receta}</span>
                    <span className="mt-1 inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold uppercase text-slate-500 dark:bg-white/10 dark:text-slate-300">
                      {reporte.marca}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <time className="mb-1 block text-[10px] text-slate-500 dark:text-slate-400">{reporte.fecha}</time>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-semibold ${estado.clases}`}>
                      {estado.texto}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => onAbrirReporte(reporte)}
                      aria-label={`Revisar reporte ${reporte.id}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-sazon-verdeHoja hover:text-sazon-verdeHoja dark:border-white/15 dark:bg-sazon-verdeNutresa dark:text-slate-200"
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                  </td>
                </tr>
              )
            })}
            {reportes.length === 0 && (
              <tr>
                <td colSpan="7" className="px-4 py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                  <i className="bi bi-inbox mb-2 block text-2xl"></i>
                  No hay reportes que coincidan con los filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 text-[10px] text-slate-500 dark:border-white/10 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className="m-0">
          Mostrando <strong className="text-slate-700 dark:text-slate-200">{inicioVisible}-{finVisible}</strong> de{' '}
          <strong className="text-slate-700 dark:text-slate-200">{total}</strong> reportes cargados en sesión
        </p>
        <nav className="flex items-center justify-end gap-1" aria-label="Paginación de reportes">
          <button
            type="button"
            onClick={() => onCambiarPagina(Math.max(1, pagina - 1))}
            disabled={pagina === 1}
            className="rounded-lg border border-slate-200 px-2.5 py-1.5 transition enabled:hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:enabled:hover:bg-white/10"
          >
            Anterior
          </button>
          <span aria-current="page" className="rounded-lg bg-sazon-verdeHoja px-2.5 py-1.5 font-bold text-white">
            {pagina}
          </span>
          <button
            type="button"
            onClick={() => onCambiarPagina(Math.min(totalPaginas, pagina + 1))}
            disabled={pagina >= totalPaginas}
            className="rounded-lg border border-slate-200 px-2.5 py-1.5 transition enabled:hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:enabled:hover:bg-white/10"
          >
            Siguiente
          </button>
        </nav>
      </div>
    </>
  )
}

export default TablaReportes
