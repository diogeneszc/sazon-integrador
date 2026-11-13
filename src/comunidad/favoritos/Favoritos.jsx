import { useState } from 'react'
import pastaImage from '../../assets/images/favoritos-pasta.jpg'
import bowlImage from '../../assets/images/favoritos-bowl.jpg'
import sandwichImage from '../../assets/images/favoritos-sandwich.jpg'
import dessertImage from '../../assets/images/favoritos-postre.jpg'

const STORAGE_KEY = 'sazon_comunidad_favoritos'

const FAVORITOS_INICIALES = ['zenu-pasta', 'doria-bowl']

const RECETAS = [
  {
    id: 'zenu-pasta',
    nombre: 'Pasta Zenú con crema de queso',
    marca: 'Zenú',
    descripcion: 'Fácil y cremosa',
    puntuacion: 4.9,
    tiempo: '25 min',
    categoria: 'Plato principal',
    imagen: pastaImage,
  },
  {
    id: 'doria-bowl',
    nombre: 'Bowl de quinoa y verduras',
    marca: 'Doria',
    descripcion: 'Ligero y nutritivo',
    puntuacion: 4.8,
    tiempo: '20 min',
    categoria: 'Almuerzo',
    imagen: bowlImage,
  },
  {
    id: 'jet-sandwich',
    nombre: 'Sándwich verde de mañana',
    marca: 'Jet',
    descripcion: 'Ideal para el desayuno',
    puntuacion: 4.7,
    tiempo: '15 min',
    categoria: 'Desayuno',
    imagen: sandwichImage,
  },
  {
    id: 'noel-postre',
    nombre: 'Postre de chocolate suizo',
    marca: 'Noel',
    descripcion: 'Cremoso y equilibrado',
    puntuacion: 4.9,
    tiempo: '40 min',
    categoria: 'Postre',
    imagen: dessertImage,
  },
]

function cargarFavoritos() {
  const iniciales = [...FAVORITOS_INICIALES]

  if (typeof window === 'undefined') {
    return { ids: iniciales, mensaje: '' }
  }

  try {
    const guardados = window.localStorage.getItem(STORAGE_KEY)
    if (guardados === null) return { ids: iniciales, mensaje: '' }

    const idsGuardados = JSON.parse(guardados)
    if (!Array.isArray(idsGuardados)) {
      throw new TypeError('Los favoritos guardados no tienen el formato esperado')
    }

    const idsValidos = new Set(RECETAS.map((receta) => receta.id))
    const ids = [...new Set(idsGuardados.filter((id) => typeof id === 'string' && idsValidos.has(id)))]
    return { ids, mensaje: '' }
  } catch {
    return {
      ids: iniciales,
      mensaje: 'No se pudieron leer los favoritos guardados. Se muestran los favoritos iniciales.',
    }
  }
}

function TarjetaReceta({ receta, esFavorita, onAlternar }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/60">
      <div className="relative h-52 overflow-hidden sm:h-56">
        <img
          src={receta.imagen}
          alt={receta.nombre}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" aria-hidden="true" />
        <span className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-black/35 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {receta.categoria}
        </span>
        <button
          type="button"
          aria-pressed={esFavorita}
          aria-label={`${esFavorita ? 'Quitar de' : 'Agregar a'} favoritos: ${receta.nombre}`}
          className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full shadow-lg backdrop-blur transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
            esFavorita
              ? 'bg-white text-rose-600 hover:bg-rose-50'
              : 'bg-black/35 text-white hover:bg-black/55'
          }`}
          onClick={() => onAlternar(receta.id)}
        >
          <i className={`bi ${esFavorita ? 'bi-heart-fill' : 'bi-heart'} text-lg`} aria-hidden="true"></i>
        </button>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="m-0 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
              {receta.marca}
            </p>
            <h3 className="m-0 mt-1 font-poppins text-lg font-bold leading-snug text-slate-900 dark:text-white">
              {receta.nombre}
            </h3>
          </div>
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-sm font-bold text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">
            <i className="bi bi-star-fill text-xs" aria-hidden="true"></i>
            {receta.puntuacion}
          </span>
        </div>

        <p className="m-0 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{receta.descripcion}</p>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/10">
          <span className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <i className="bi bi-clock" aria-hidden="true"></i>
            {receta.tiempo}
          </span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {esFavorita ? 'Guardada en favoritos' : 'Toca el corazón para guardar'}
          </span>
        </div>
      </div>
    </article>
  )
}

function Favoritos() {
  const [estado, setEstado] = useState(cargarFavoritos)
  const favoritas = RECETAS.filter((receta) => estado.ids.includes(receta.id))
  const paraDescubrir = RECETAS.filter((receta) => !estado.ids.includes(receta.id))

  const alternarFavorito = (id) => {
    const ids = estado.ids.includes(id)
      ? estado.ids.filter((favoritoId) => favoritoId !== id)
      : [...estado.ids, id]

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
      const receta = RECETAS.find((item) => item.id === id)
      setEstado({
        ids,
        mensaje: estado.ids.includes(id)
          ? `${receta.nombre} se quitó de favoritos.`
          : `${receta.nombre} se guardó en favoritos.`,
      })
    } catch {
      setEstado({ ...estado, mensaje: 'No se pudieron guardar los cambios de favoritos.' })
    }
  }

  return (
    <section className="space-y-9">
      <header className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-800 px-6 py-8 text-white shadow-xl sm:px-9 sm:py-10">
        <div className="absolute -right-12 -top-16 -z-10 h-64 w-64 rounded-full bg-emerald-400/10 blur-2xl" aria-hidden="true" />
        <div className="absolute -bottom-28 right-1/4 -z-10 h-56 w-56 rounded-full bg-lime-300/10 blur-2xl" aria-hidden="true" />
        <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-emerald-100">
              <i className="bi bi-heart-fill text-rose-300" aria-hidden="true"></i>
              Sa·zón · Comunidad
            </span>
            <h1 className="m-0 mt-4 font-poppins text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Tus recetas favoritas
            </h1>
            <p className="m-0 mt-3 max-w-xl text-sm leading-relaxed text-emerald-50 sm:text-base">
              Guarda las recetas que te encantan y vuelve a ellas cuando quieras cocinar algo especial.
            </p>
          </div>
          <div className="flex w-fit items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-sm">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl font-bold text-emerald-900">
              {favoritas.length}
            </span>
            <span>
              <span className="block text-lg font-bold text-white">
                {favoritas.length === 1 ? 'receta guardada' : 'recetas guardadas'}
              </span>
              <span className="block text-xs text-emerald-100">en tu colección</span>
            </span>
          </div>
        </div>
      </header>

      <section aria-labelledby="favoritas-heading" className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="m-0 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
              Tu colección personal
            </p>
            <h2 id="favoritas-heading" className="m-0 mt-1 font-poppins text-2xl font-bold text-slate-900 dark:text-white">
              Mis favoritos
            </h2>
          </div>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {favoritas.length} de {RECETAS.length} recetas
          </span>
        </div>

        {favoritas.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {favoritas.map((receta) => (
              <TarjetaReceta
                key={receta.id}
                receta={receta}
                esFavorita
                onAlternar={alternarFavorito}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-10 text-center dark:border-white/15 dark:bg-white/5">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-2xl text-rose-500 dark:bg-rose-400/10 dark:text-rose-300">
              <i className="bi bi-heart" aria-hidden="true"></i>
            </span>
            <h3 className="m-0 mt-4 font-poppins text-lg font-bold text-slate-900 dark:text-white">
              Tu colección empieza aquí
            </h3>
            <p className="m-0 mt-2 text-sm text-slate-600 dark:text-slate-300">
              Guarda una receta con el corazón para encontrarla fácilmente después.
            </p>
            <a
              href="#descubrir-recetas"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300"
            >
              Explorar recetas
              <i className="bi bi-arrow-down" aria-hidden="true"></i>
            </a>
          </div>
        )}
      </section>

      {paraDescubrir.length > 0 && (
        <section id="descubrir-recetas" aria-labelledby="descubrir-heading" className="space-y-5">
          <div>
            <p className="m-0 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
              Nuevas ideas para tu mesa
            </p>
            <h2 id="descubrir-heading" className="m-0 mt-1 font-poppins text-2xl font-bold text-slate-900 dark:text-white">
              Descubre otras recetas
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {paraDescubrir.map((receta) => (
              <TarjetaReceta
                key={receta.id}
                receta={receta}
                esFavorita={false}
                onAlternar={alternarFavorito}
              />
            ))}
          </div>
        </section>
      )}

      {estado.mensaje && (
        <p
          role="status"
          className="m-0 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-300/20 dark:bg-emerald-300/10 dark:text-emerald-100"
        >
          <i className="bi bi-check-circle-fill mr-2" aria-hidden="true"></i>
          {estado.mensaje}
        </p>
      )}
    </section>
  )
}

export default Favoritos
