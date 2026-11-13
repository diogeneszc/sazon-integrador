function AvisoModeracion({ onReportar, hrefModeracion = '#moderacion' }) {
  return (
    <aside className="bg-slate-100/80 dark:bg-sazon-verdeNutresaCard rounded-2xl border border-black/5 dark:border-white/10 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-sazon-texto dark:text-slate-200 flex items-center gap-2 m-0">
        <i className="bi bi-shield-exclamation text-lg text-sazon-verdeHondo dark:text-sazon-verdeNeon"></i>
        ¿Encontraste una valoración inapropiada? Repórtala al equipo de moderación comunitaria.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onReportar}
          className="text-xs px-3 py-1.5 rounded-full bg-white dark:bg-sazon-verdeNutresa text-sazon-texto dark:text-slate-200 border border-black/10 dark:border-white/10 hover:border-sazon-brandZenu cursor-pointer"
        >
          <i className="bi bi-flag mr-1"></i>
          Reportar
        </button>
        <a
          href={hrefModeracion}
          className="text-xs px-3 py-1.5 rounded-full bg-sazon-verdeNoche text-white font-bold hover:bg-sazon-verdeHondo no-underline"
        >
          Panel de Moderación (HU-01)
        </a>
      </div>
    </aside>
  )
}

export default AvisoModeracion
