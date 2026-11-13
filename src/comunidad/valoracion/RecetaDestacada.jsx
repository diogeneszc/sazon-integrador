import Estrellas from './Estrellas'
import ImagenPlato from './ImagenPlato'

function RecetaDestacada({ receta }) {
  const { id, titulo, descripcion, etiquetaImagen, imagen, tiempo, porciones, ahorro, promedio, totalEvaluaciones } =
    receta

  return (
    <article className="bg-white dark:bg-sazon-verdeNutresaCard rounded-2xl border border-black/5 dark:border-white/10 shadow-sm p-5 sm:p-6 flex flex-col md:flex-row gap-5 md:items-center">
      <ImagenPlato src={imagen} alt={titulo} className="w-full md:w-32 h-40 md:h-32 rounded-xl shrink-0 shadow">
        {etiquetaImagen && (
          <figcaption className="absolute bottom-1.5 right-1.5 bg-sazon-verdeNoche/90 text-white text-[11px] font-semibold px-2 py-0.5 rounded">
            {etiquetaImagen}
          </figcaption>
        )}
      </ImagenPlato>

      <section className="flex-1 min-w-0 space-y-2">
        <p className="flex flex-wrap gap-2 text-[11px] font-mono-tag font-bold uppercase">
          <span className="bg-sazon-hoja/80 text-sazon-verdeNoche px-1.5 py-0.5 rounded">Receta destacada</span>
          <span className="bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">
            ID #{id}
          </span>
        </p>
        <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-sazon-verdeNoche dark:text-white leading-tight">
          {titulo}
        </h1>
        <p className="text-sm text-sazon-texto2 dark:text-slate-300">{descripcion}</p>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-sazon-texto dark:text-slate-200 pt-1 list-none p-0 m-0">
          <li className="flex items-center gap-1.5">
            <i className="bi bi-clock text-sazon-verdeHondo dark:text-sazon-verdeNeon"></i>
            {tiempo}
          </li>
          <li className="flex items-center gap-1.5">
            <i className="bi bi-people text-sazon-verdeHondo dark:text-sazon-verdeNeon"></i>
            {porciones} porciones
          </li>
          <li className="flex items-center gap-1.5">
            <i className="bi bi-piggy-bank text-sazon-verdeHondo dark:text-sazon-verdeNeon"></i>
            Ahorro: {ahorro}
          </li>
        </ul>
      </section>

      <aside className="bg-sazon-marfil dark:bg-sazon-verdeNutresa rounded-xl px-5 py-4 text-center shrink-0 self-stretch md:self-auto flex flex-col justify-center">
        <p className="m-0 font-poppins">
          <span className="text-3xl font-bold text-sazon-verdeNoche dark:text-white">{promedio}</span>
          <span className="text-sm text-sazon-texto2 dark:text-slate-400"> / 5.0</span>
        </p>
        <Estrellas valor={promedio} tamano="text-lg" />
        <p className="text-xs text-sazon-texto2 dark:text-slate-400 mt-1 m-0">{totalEvaluaciones} cocineros evaluaron</p>
      </aside>
    </article>
  )
}

export default RecetaDestacada
