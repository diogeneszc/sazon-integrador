const TARJETAS = [
  {
    id: 'pendientes',
    etiqueta: 'Reportes pendientes',
    detalle: 'en cola urgente',
    icono: 'bi-exclamation-triangle',
    color: 'text-red-700 dark:text-red-300',
    tono: 'bg-red-100 dark:bg-red-400/15',
    borde: 'border-red-200 dark:border-red-900/50',
    marca: 'bg-red-500',
    pieIcono: 'bi-exclamation-lg',
    pie: '3 con alta prioridad de revisión',
  },
  {
    id: 'aprobados',
    etiqueta: 'Aprobados hoy',
    detalle: '+18% vs ayer',
    icono: 'bi-check-circle',
    color: 'text-sazon-verdeHoja dark:text-sazon-verdeNeon',
    tono: 'bg-sazon-verdeHoja/10 dark:bg-sazon-verdeHoja/15',
    borde: 'border-sazon-verdeHoja/20 dark:border-emerald-900/50',
    marca: 'bg-sazon-verdeHoja',
    pieIcono: 'bi-patch-check',
    pie: 'Interacciones culinarias válidas',
  },
  {
    id: 'bloqueados',
    etiqueta: 'Contenido bloqueado',
    detalle: 'infracciones',
    icono: 'bi-slash-circle',
    color: 'text-amber-700 dark:text-amber-300',
    tono: 'bg-amber-100 dark:bg-amber-400/15',
    borde: 'border-amber-200 dark:border-amber-900/50',
    marca: 'bg-amber-600',
    pieIcono: 'bi-hammer',
    pie: 'Infracciones directas a normas',
  },
  {
    id: 'tiempo',
    etiqueta: 'Tiempo promedio',
    detalle: 'min',
    icono: 'bi-stopwatch',
    color: 'text-stone-700 dark:text-stone-200',
    tono: 'bg-stone-100 dark:bg-white/10',
    borde: 'border-slate-200 dark:border-white/10',
    marca: 'bg-stone-500',
    pieIcono: 'bi-graph-down-arrow',
    pie: '-4.5 min por debajo del SLA',
  },
]

function EstadisticasModeracion({ pendientes, aprobados, bloqueados }) {
  const valores = { pendientes, aprobados, bloqueados, tiempo: 14 }

  return (
    <section aria-label="Resumen de moderación" className="grid grid-cols-1 gap-4 sm:grid-cols-2 min-[900px]:grid-cols-4">
      {TARJETAS.map((tarjeta) => (
        <article
          key={tarjeta.id}
          className={`overflow-hidden rounded-2xl border ${tarjeta.borde} bg-white shadow-sm dark:bg-sazon-verdeNutresaCard`}
        >
          <div className="flex items-start justify-between gap-3 p-4 sm:p-5">
            <div className="min-w-0">
              <p className={`m-0 font-mono-tag text-[10px] font-bold uppercase tracking-wider ${tarjeta.color}`}>
                {tarjeta.etiqueta}
              </p>
              <div className="mt-3 flex items-baseline gap-2">
                <strong className={`font-poppins text-3xl font-bold ${tarjeta.color}`}>
                  {valores[tarjeta.id]}
                </strong>
                <span className="text-xs text-slate-500 dark:text-slate-400">{tarjeta.detalle}</span>
              </div>
            </div>
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tarjeta.tono} ${tarjeta.color}`}>
              <i className={`bi ${tarjeta.icono} text-base`}></i>
            </span>
          </div>
          <div className="flex items-center gap-2 border-t border-slate-100 px-4 py-2.5 text-[10px] text-slate-600 dark:border-white/10 dark:text-slate-300 sm:px-5">
            <i className={`bi ${tarjeta.pieIcono} ${tarjeta.color}`}></i>
            <span>{tarjeta.pie}</span>
          </div>
          <div className={`h-1 ${tarjeta.marca}`}></div>
        </article>
      ))}
    </section>
  )
}

export default EstadisticasModeracion
