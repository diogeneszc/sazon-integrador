import { useState } from 'react'
import TarjetaResena from './TarjetaResena'

const FILTROS = [
  { id: 'recientes', etiqueta: 'Más recientes' },
  { id: 'mejores', etiqueta: 'Mejor calificadas (5★)' },
  { id: 'fotos', etiqueta: 'Con fotos', icono: 'bi-images' },
]

const POR_PAGINA = 3

function aplicarFiltro(resenas, filtro) {
  if (filtro === 'mejores') return resenas.filter((r) => r.puntuacion === 5)
  if (filtro === 'fotos') return resenas.filter((r) => r.imagen || r.imagenUrl || r.conFoto)
  return [...resenas].sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
}

function ResenasComunidad({ resenas, totalVerificadas, onMeGusta }) {
  const [filtro, setFiltro] = useState('recientes')
  const [visibles, setVisibles] = useState(POR_PAGINA)

  const filtradas = aplicarFiltro(resenas, filtro)
  const conFotos = resenas.filter((r) => r.imagen || r.imagenUrl || r.conFoto).length
  const restantes = Math.max(filtradas.length - visibles, 0)

  const cambiarFiltro = (id) => {
    setFiltro(id)
    setVisibles(POR_PAGINA)
  }

  return (
    <section className="space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-poppins text-2xl font-bold text-sazon-verdeNoche dark:text-white flex items-center gap-3 m-0">
          Reseñas de la Comunidad
          <span className="text-xs font-normal font-inter bg-slate-100 dark:bg-white/10 text-sazon-texto2 dark:text-slate-300 px-2 py-0.5 rounded">
            {totalVerificadas} verificadas
          </span>
        </h2>
        <nav className="flex flex-wrap gap-2" aria-label="Filtrar reseñas">
          {FILTROS.map(({ id, etiqueta, icono }) => {
            const activo = filtro === id
            return (
              <button
                key={id}
                type="button"
                aria-pressed={activo}
                onClick={() => cambiarFiltro(id)}
                className={`text-xs px-3 py-1.5 rounded-full border transition cursor-pointer flex items-center gap-1.5 ${
                  activo
                    ? 'bg-sazon-verdeNoche text-white border-sazon-verdeNoche font-bold'
                    : 'bg-white dark:bg-sazon-verdeNutresaCard text-sazon-texto dark:text-slate-200 border-black/10 dark:border-white/10 hover:border-sazon-verdeHoja'
                }`}
              >
                {icono && <i className={`bi ${icono}`}></i>}
                {etiqueta}
                {id === 'fotos' && ` (${conFotos})`}
              </button>
            )
          })}
        </nav>
      </header>

      {filtradas.length === 0 ? (
        <p className="text-sm text-sazon-texto2 dark:text-slate-400 text-center py-10 m-0">
          No hay reseñas para este filtro todavía.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtradas.slice(0, visibles).map((r) => (
            <TarjetaResena key={r.id} resena={r} onMeGusta={onMeGusta} />
          ))}
        </div>
      )}

      {restantes > 0 && (
        <p className="text-center m-0">
          <button
            type="button"
            onClick={() => setVisibles((v) => v + POR_PAGINA)}
            className="text-sm text-sazon-verdeHondo dark:text-sazon-verdeNeon font-semibold hover:underline cursor-pointer"
          >
            Cargar {Math.min(restantes, POR_PAGINA)} más
          </button>
        </p>
      )}
    </section>
  )
}

export default ResenasComunidad
