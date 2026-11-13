import Estrellas from './Estrellas'
import ImagenPlato from './ImagenPlato'

function TarjetaResena({ resena, onMeGusta }) {
  const {
    id,
    autor,
    iniciales,
    colorAvatar,
    ciudad,
    rol,
    verificado,
    hace,
    puntuacion,
    criterioDestacado,
    texto,
    imagen,
    imagenUrl,
    truco,
    meGusta,
    leGusta,
    respuestas,
  } = resena

  const fotoSrc = imagenUrl ?? imagen
  const tieneFoto = Boolean(fotoSrc) || resena.conFoto

  return (
    <article className="bg-white dark:bg-sazon-verdeNutresaCard rounded-2xl border border-black/5 dark:border-white/10 shadow-sm p-5 flex flex-col gap-3">
      <header className="flex items-start gap-3">
        <span
          className={`w-11 h-11 shrink-0 rounded-full ${colorAvatar} text-white font-poppins font-semibold flex items-center justify-center`}
        >
          {iniciales}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-poppins text-base font-semibold text-sazon-verdeNoche dark:text-white flex items-center gap-1.5 m-0">
            <span className="truncate">{autor}</span>
            {verificado && (
              <i className="bi bi-patch-check text-sazon-verdeHoja dark:text-sazon-verdeNeon" title="Verificado"></i>
            )}
          </h3>
          <p className="text-xs text-sazon-texto2 dark:text-slate-400 m-0">
            {ciudad} · {rol}
          </p>
        </div>
        <time className="text-xs text-sazon-texto2 dark:text-slate-400 shrink-0">{hace}</time>
      </header>

      <p className="flex items-center gap-2 text-xs m-0">
        <Estrellas valor={puntuacion} tamano="text-sm" />
        <strong className="text-sazon-verdeNoche dark:text-white">{puntuacion.toFixed(1)}</strong>
        {criterioDestacado && <span className="text-sazon-texto2 dark:text-slate-400">{criterioDestacado}</span>}
      </p>

      <blockquote className="text-sm leading-relaxed text-sazon-texto dark:text-slate-200 m-0">"{texto}"</blockquote>

      {truco && (
        <p className="bg-sazon-marfil dark:bg-sazon-verdeNutresa rounded-lg p-3 text-xs italic text-sazon-texto2 dark:text-slate-300 flex gap-2 m-0">
          <i className="bi bi-lightbulb not-italic text-sazon-verdeHondo dark:text-sazon-verdeNeon"></i>
          Truco: {truco}
        </p>
      )}

      {tieneFoto && <ImagenPlato src={fotoSrc} alt={`Plato de ${autor}`} className="h-40 rounded-xl" />}

      <footer className="mt-auto pt-2 flex items-center justify-between text-xs text-sazon-texto2 dark:text-slate-400">
        <button
          type="button"
          onClick={() => onMeGusta?.(id)}
          aria-pressed={leGusta}
          className="flex items-center gap-1.5 hover:text-sazon-brandZenu transition cursor-pointer"
        >
          <i className={`bi ${leGusta ? 'bi-heart-fill text-sazon-brandZenu' : 'bi-heart'} text-base`}></i>
          {meGusta} me gusta
        </button>
        <span className="flex items-center gap-1.5">
          <i className="bi bi-chat-square text-base"></i>
          {respuestas} respuestas
        </span>
      </footer>
    </article>
  )
}

export default TarjetaResena
