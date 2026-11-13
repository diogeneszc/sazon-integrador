function colorBarra(estrellas) {
  if (estrellas >= 4) return 'bg-sazon-verdeNoche dark:bg-sazon-verdeNeon'
  if (estrellas === 3) return 'bg-sazon-verdeHoja'
  if (estrellas === 2) return 'bg-amber-500'
  return 'bg-sazon-brandZenu'
}

function DistribucionPuntuacion({ distribucion }) {
  const { recomendado, niveles, criterios } = distribucion

  return (
    <section className="bg-white dark:bg-sazon-verdeNutresaCard rounded-2xl border border-black/5 dark:border-white/10 shadow-sm p-5 sm:p-6">
      <header className="flex items-start justify-between gap-3 mb-5">
        <div>
          <h2 className="font-poppins text-lg font-semibold text-sazon-verdeNoche dark:text-white m-0">
            Distribución de Puntuación
          </h2>
          <p className="text-sm text-sazon-texto2 dark:text-slate-400 m-0">Auditoría comunitaria en tiempo real</p>
        </div>
        <span className="bg-sazon-hoja/80 text-sazon-verdeNoche text-xs font-bold px-2 py-1 rounded leading-tight shrink-0">
          {recomendado}%
          <br />
          Recomendado
        </span>
      </header>

      <ul className="space-y-2.5 list-none p-0 m-0">
        {niveles.map(({ estrellas, porcentaje, cantidad }) => (
          <li key={estrellas} className="flex items-center gap-3 text-xs">
            <span className="w-8 shrink-0 text-sazon-texto dark:text-slate-300 flex items-center gap-1">
              {estrellas} <i className="bi bi-star text-sazon-verdeHondo dark:text-sazon-verdeNeon"></i>
            </span>
            <span
              className="flex-1 h-2.5 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden"
              role="progressbar"
              aria-valuenow={porcentaje}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${estrellas} estrellas`}
            >
              <span
                className={`block h-full rounded-full ${colorBarra(estrellas)}`}
                style={{ width: `${Math.max(porcentaje, 1)}%` }}
              ></span>
            </span>
            <span className="w-16 shrink-0 text-right text-sazon-texto2 dark:text-slate-400 font-mono-tag">
              {porcentaje}% ({cantidad})
            </span>
          </li>
        ))}
      </ul>

      <dl className="grid grid-cols-3 gap-2 mt-6 bg-sazon-marfil dark:bg-sazon-verdeNutresa rounded-xl p-4 text-center m-0">
        {criterios.map(({ nombre, valor }) => (
          <div key={nombre}>
            <dd className="font-poppins text-2xl font-bold text-sazon-verdeNoche dark:text-white m-0">{valor}</dd>
            <dt className="text-[11px] uppercase tracking-wide text-sazon-texto2 dark:text-slate-400">{nombre}</dt>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default DistribucionPuntuacion
