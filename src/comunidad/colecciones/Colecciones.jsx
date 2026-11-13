import { useEffect, useMemo, useState } from 'react'

const COLECCIONES_INICIALES = [
  {
    id: 'cenas-rapidas',
    nombre: 'Cenas rápidas',
    descripcion: 'Ideas deliciosas para resolver la comida sin complicarte.',
    privacidad: 'Privada',
    actualizada: 'Actualizada hoy',
    color: 'from-emerald-800 via-green-700 to-lime-600',
    icono: 'bi-lightning-charge-fill',
    recetas: [
      { nombre: 'Penne con salchicha y albahaca', tiempo: '25 min', marca: 'Doria + Zenú' },
      { nombre: 'Arepas rellenas de pollo', tiempo: '30 min', marca: 'Zenú' },
      { nombre: 'Arroz cremoso con vegetales', tiempo: '20 min', marca: 'Rodeo' },
    ],
  },
  {
    id: 'para-compartir',
    nombre: 'Para compartir',
    descripcion: 'Recetas que siempre reúnen a todos alrededor de la mesa.',
    privacidad: 'Pública',
    actualizada: 'Actualizada hace 2 días',
    color: 'from-amber-800 via-orange-700 to-rose-500',
    icono: 'bi-people-fill',
    recetas: [
      { nombre: 'Picada casera para el fin de semana', tiempo: '45 min', marca: 'Zenú + Pietrán' },
      { nombre: 'Pasta al horno con vegetales', tiempo: '50 min', marca: 'Doria' },
    ],
  },
  {
    id: 'postres-domingo',
    nombre: 'Postres de domingo',
    descripcion: 'Un toque dulce para cerrar el almuerzo en familia.',
    privacidad: 'Privada',
    actualizada: 'Actualizada hace 1 semana',
    color: 'from-fuchsia-900 via-rose-700 to-amber-500',
    icono: 'bi-cake2-fill',
    recetas: [
      { nombre: 'Milo frío con galletas', tiempo: '15 min', marca: 'Tosh' },
      { nombre: 'Torta sencilla de chocolate', tiempo: '55 min', marca: 'Corona' },
      { nombre: 'Parfait de frutas y granola', tiempo: '10 min', marca: 'Tosh' },
      { nombre: 'Flan de caramelo', tiempo: '1 h', marca: 'Colcafé' },
    ],
  },
]

const FILTROS = [
  { id: 'Todas', etiqueta: 'Todas' },
  { id: 'Pública', etiqueta: 'Públicas' },
  { id: 'Privada', etiqueta: 'Privadas' },
]

function ColeccionCard({ coleccion, onAbrir }) {
  const iniciales = coleccion.nombre
    .split(' ')
    .slice(0, 2)
    .map((palabra) => palabra[0])
    .join('')
    .toUpperCase()

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-emerald-900/60 dark:bg-sazon-verdeNutresaCard">
      <div className={`relative flex h-44 items-end overflow-hidden bg-gradient-to-br ${coleccion.color} p-5`}>
        <div aria-hidden="true" className="absolute -right-5 -top-8 h-40 w-40 rounded-full border-[18px] border-white/10" />
        <div aria-hidden="true" className="absolute right-16 -top-10 h-32 w-32 rounded-full border border-white/15" />
        <span className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-xl text-white backdrop-blur-sm">
          <i className={`bi ${coleccion.icono}`} />
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-black/20 px-3 py-1 font-mono-tag text-[10px] font-semibold text-white backdrop-blur-sm">
          {coleccion.recetas.length} {coleccion.recetas.length === 1 ? 'receta' : 'recetas'}
        </span>
        <div className="relative z-10 flex w-full items-end justify-between gap-3 text-white">
          <div className="min-w-0">
            <p className="mb-1 font-mono-tag text-[10px] uppercase tracking-[0.16em] text-white/75">Mi colección</p>
            <h2 className="m-0 truncate font-poppins text-xl font-bold text-white">{coleccion.nombre}</h2>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/15 font-poppins text-xs font-bold text-white">
            {iniciales}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 font-mono-tag text-[10px] font-semibold text-sazon-verdeHondo dark:bg-emerald-950/60 dark:text-sazon-verdeNeon">
            <i className={`bi ${coleccion.privacidad === 'Pública' ? 'bi-globe2' : 'bi-lock-fill'}`} />
            {coleccion.privacidad}
          </span>
          <span className="font-mono-tag text-[10px] text-slate-500 dark:text-slate-400">{coleccion.actualizada}</span>
        </div>
        <p className="mb-4 min-h-10 text-sm leading-5 text-slate-600 dark:text-slate-300">{coleccion.descripcion}</p>

        <div className="mb-4 space-y-2 border-t border-slate-100 pt-4 dark:border-emerald-900/60">
          {coleccion.recetas.slice(0, 2).map((receta) => (
            <div className="flex items-center justify-between gap-3" key={receta.nombre}>
              <span className="truncate text-xs font-medium text-slate-700 dark:text-slate-200">{receta.nombre}</span>
              <span className="shrink-0 font-mono-tag text-[10px] text-slate-500 dark:text-slate-400">{receta.tiempo}</span>
            </div>
          ))}
          {coleccion.recetas.length > 2 && (
            <p className="m-0 font-mono-tag text-[10px] text-sazon-verdeHoja">
              + {coleccion.recetas.length - 2} recetas más
            </p>
          )}
        </div>

        <button
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-sazon-verdeHoja/30 px-4 py-2.5 font-mono-tag text-xs font-semibold text-sazon-verdeHondo transition hover:bg-emerald-50 dark:text-sazon-verdeNeon dark:hover:bg-emerald-950/50"
          onClick={() => onAbrir(coleccion)}
          type="button"
        >
          Ver colección <i className="bi bi-arrow-right" />
        </button>
      </div>
    </article>
  )
}

function Modal({ titulo, descripcion, onCerrar, children }) {
  useEffect(() => {
    const manejarEscape = (evento) => {
      if (evento.key === 'Escape') onCerrar()
    }

    window.addEventListener('keydown', manejarEscape)
    return () => window.removeEventListener('keydown', manejarEscape)
  }, [onCerrar])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
      onMouseDown={(evento) => {
        if (evento.target === evento.currentTarget) onCerrar()
      }}
    >
      <section
        aria-describedby="colecciones-modal-descripcion"
        aria-labelledby="colecciones-modal-titulo"
        aria-modal="true"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-sazon-verdeNutresaCard sm:p-8"
        role="dialog"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="m-0 font-poppins text-2xl font-bold text-sazon-verdeNoche dark:text-white" id="colecciones-modal-titulo">
              {titulo}
            </h2>
            <p className="mb-0 mt-2 text-sm text-slate-600 dark:text-slate-300" id="colecciones-modal-descripcion">
              {descripcion}
            </p>
          </div>
          <button
            aria-label="Cerrar ventana"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-emerald-950"
            onClick={onCerrar}
            type="button"
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>
        {children}
      </section>
    </div>
  )
}

function Colecciones() {
  const [colecciones, setColecciones] = useState(COLECCIONES_INICIALES)
  const [filtro, setFiltro] = useState('Todas')
  const [busqueda, setBusqueda] = useState('')
  const [modalCrearAbierto, setModalCrearAbierto] = useState(false)
  const [coleccionActiva, setColeccionActiva] = useState(null)
  const [nombreNueva, setNombreNueva] = useState('')
  const [descripcionNueva, setDescripcionNueva] = useState('')
  const [privacidadNueva, setPrivacidadNueva] = useState('Privada')

  const coleccionesVisibles = useMemo(() => {
    const consulta = busqueda.trim().toLocaleLowerCase('es')

    return colecciones.filter((coleccion) => {
      const coincideFiltro = filtro === 'Todas' || coleccion.privacidad === filtro
      const coincideBusqueda = `${coleccion.nombre} ${coleccion.descripcion}`
        .toLocaleLowerCase('es')
        .includes(consulta)

      return coincideFiltro && coincideBusqueda
    })
  }, [busqueda, colecciones, filtro])

  const cerrarModalCrear = () => setModalCrearAbierto(false)
  const cerrarColeccionActiva = () => setColeccionActiva(null)

  const crearColeccion = (evento) => {
    evento.preventDefault()

    const nombre = nombreNueva.trim()
    if (!nombre) return

    const nuevaColeccion = {
      id: `coleccion-${Date.now()}`,
      nombre,
      descripcion: descripcionNueva.trim() || 'Tu espacio para guardar recetas favoritas.',
      privacidad: privacidadNueva,
      actualizada: 'Creada ahora',
      color: 'from-sazon-verdeNoche via-sazon-verdeHondo to-sazon-verdeHoja',
      icono: 'bi-bookmark-heart-fill',
      recetas: [],
    }

    setColecciones((actuales) => [nuevaColeccion, ...actuales])
    setFiltro('Todas')
    setBusqueda('')
    setNombreNueva('')
    setDescripcionNueva('')
    setPrivacidadNueva('Privada')
    cerrarModalCrear()
  }

  const totalRecetas = colecciones.reduce((total, coleccion) => total + coleccion.recetas.length, 0)

  return (
    <section className="space-y-6">
      <header className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-emerald-900/60 dark:bg-sazon-verdeNutresaCard">
        <div className="grid gap-0 lg:grid-cols-[1fr_auto]">
          <div className="p-6 sm:p-8">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 font-mono-tag text-[10px] font-bold uppercase tracking-[0.12em] text-sazon-verdeHondo dark:bg-emerald-950/60 dark:text-sazon-verdeNeon">
              <i className="bi bi-bookmark-heart-fill" /> Tu recetario personal
            </span>
            <h1 className="mb-2 mt-0 font-poppins text-3xl font-extrabold tracking-tight text-sazon-verdeNoche dark:text-white sm:text-4xl">
              Mis <span className="italic text-sazon-verdeHoja">colecciones</span>
            </h1>
            <p className="mb-0 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
              Guarda tus recetas favoritas en un solo lugar y organízalas para cada momento.
              Crea colecciones privadas o compártelas con la comunidad.
            </p>
          </div>
          <aside className="flex flex-row items-center justify-between gap-5 bg-sazon-verdeNutresa px-6 py-5 text-white lg:w-64 lg:flex-col lg:items-start lg:justify-center lg:px-7">
            <div>
              <p className="mb-1 font-mono-tag text-[10px] uppercase tracking-[0.14em] text-emerald-100/80">Tu biblioteca</p>
              <p className="m-0 font-poppins text-3xl font-bold text-white">{colecciones.length}</p>
              <p className="m-0 text-xs text-emerald-100/80">colecciones creadas</p>
            </div>
            <div className="border-l border-white/20 pl-5 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-4">
              <p className="m-0 font-poppins text-2xl font-bold text-white">{totalRecetas}</p>
              <p className="m-0 text-xs text-emerald-100/80">recetas guardadas</p>
            </div>
          </aside>
        </div>
      </header>

      <section aria-label="Herramientas de colecciones" className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-emerald-900/60 dark:bg-sazon-verdeNutresaCard sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar colecciones">
          {FILTROS.map((opcion) => (
            <button
              aria-pressed={filtro === opcion.id}
              className={`rounded-full px-4 py-2 font-mono-tag text-xs font-semibold transition ${
                filtro === opcion.id
                  ? 'bg-sazon-verdeHoja text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 dark:bg-emerald-950/60 dark:text-slate-300 dark:hover:bg-emerald-900'
              }`}
              key={opcion.id}
              onClick={() => setFiltro(opcion.id)}
              type="button"
            >
              {opcion.etiqueta}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative min-w-0 sm:w-64">
            <span className="sr-only">Buscar en mis colecciones</span>
            <i className="bi bi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
            <input
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 font-inter text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sazon-verdeHoja focus:ring-2 focus:ring-sazon-verdeHoja/20 dark:border-emerald-900 dark:bg-sazon-verdeNutresa dark:text-white"
              onChange={(evento) => setBusqueda(evento.target.value)}
              placeholder="Buscar colección..."
              type="search"
              value={busqueda}
            />
          </label>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-sazon-verdeHoja px-4 py-2.5 font-mono-tag text-xs font-bold text-white shadow-sm transition hover:bg-sazon-verdeHondo"
            onClick={() => setModalCrearAbierto(true)}
            type="button"
          >
            <i className="bi bi-plus-lg" /> Nueva colección
          </button>
        </div>
      </section>

      <div className="flex items-center justify-between gap-3">
        <h2 className="m-0 font-poppins text-lg font-bold text-sazon-verdeNoche dark:text-white">Tu espacio culinario</h2>
        <span className="font-mono-tag text-[10px] text-slate-500 dark:text-slate-400">
          {coleccionesVisibles.length} {coleccionesVisibles.length === 1 ? 'colección' : 'colecciones'}
        </span>
      </div>

      {coleccionesVisibles.length ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {coleccionesVisibles.map((coleccion) => (
            <ColeccionCard coleccion={coleccion} key={coleccion.id} onAbrir={setColeccionActiva} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-emerald-800 dark:bg-sazon-verdeNutresaCard">
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-sazon-verdeHoja dark:bg-emerald-950">
            <i className="bi bi-search" />
          </span>
          <h3 className="mb-2 mt-0 font-poppins text-lg font-bold text-sazon-verdeNoche dark:text-white">No encontramos colecciones</h3>
          <p className="mb-0 text-sm text-slate-600 dark:text-slate-300">Prueba con otro nombre o cambia los filtros.</p>
        </div>
      )}

      {modalCrearAbierto && (
        <Modal
          descripcion="Dale un nombre y decide quién puede ver las recetas que organices."
          onCerrar={cerrarModalCrear}
          titulo="Crear colección"
        >
          <form className="space-y-4" onSubmit={crearColeccion}>
            <label className="block">
              <span className="mb-1.5 block font-mono-tag text-xs font-semibold text-slate-700 dark:text-slate-200">Nombre de la colección *</span>
              <input
                autoFocus
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 font-inter text-sm text-slate-800 outline-none focus:border-sazon-verdeHoja focus:ring-2 focus:ring-sazon-verdeHoja/20 dark:border-emerald-900 dark:bg-sazon-verdeNutresa dark:text-white"
                maxLength={50}
                onChange={(evento) => setNombreNueva(evento.target.value)}
                placeholder="Ej. Almuerzos para la semana"
                required
                value={nombreNueva}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block font-mono-tag text-xs font-semibold text-slate-700 dark:text-slate-200">Descripción</span>
              <textarea
                className="min-h-24 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 font-inter text-sm text-slate-800 outline-none focus:border-sazon-verdeHoja focus:ring-2 focus:ring-sazon-verdeHoja/20 dark:border-emerald-900 dark:bg-sazon-verdeNutresa dark:text-white"
                maxLength={160}
                onChange={(evento) => setDescripcionNueva(evento.target.value)}
                placeholder="¿Qué recetas quieres reunir aquí?"
                value={descripcionNueva}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block font-mono-tag text-xs font-semibold text-slate-700 dark:text-slate-200">Privacidad</span>
              <select
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 font-mono-tag text-xs text-slate-800 outline-none focus:border-sazon-verdeHoja focus:ring-2 focus:ring-sazon-verdeHoja/20 dark:border-emerald-900 dark:bg-sazon-verdeNutresa dark:text-white"
                onChange={(evento) => setPrivacidadNueva(evento.target.value)}
                value={privacidadNueva}
              >
                <option>Privada</option>
                <option>Pública</option>
              </select>
            </label>
            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <button
                className="rounded-xl border border-slate-200 px-4 py-2.5 font-mono-tag text-xs font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-emerald-900 dark:text-slate-200 dark:hover:bg-emerald-950"
                onClick={cerrarModalCrear}
                type="button"
              >
                Cancelar
              </button>
              <button
                className="rounded-xl bg-sazon-verdeHoja px-5 py-2.5 font-mono-tag text-xs font-bold text-white transition hover:bg-sazon-verdeHondo"
                type="submit"
              >
                Crear colección
              </button>
            </div>
          </form>
        </Modal>
      )}

      {coleccionActiva && (
        <Modal
          descripcion={coleccionActiva.descripcion}
          onCerrar={cerrarColeccionActiva}
          titulo={coleccionActiva.nombre}
        >
          <div className="mb-5 flex items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-3 py-1 font-mono-tag text-[10px] font-semibold text-sazon-verdeHondo dark:bg-emerald-950 dark:text-sazon-verdeNeon">
              {coleccionActiva.privacidad}
            </span>
            <span className="font-mono-tag text-[10px] text-slate-500 dark:text-slate-400">
              {coleccionActiva.recetas.length} {coleccionActiva.recetas.length === 1 ? 'receta' : 'recetas'}
            </span>
          </div>
          {coleccionActiva.recetas.length > 0 ? (
            <ul className="m-0 list-none space-y-3 p-0">
              {coleccionActiva.recetas.map((receta, indice) => (
                <li className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3.5 dark:border-emerald-900/60 dark:bg-sazon-verdeNutresa" key={receta.nombre}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white font-poppins text-sm font-bold text-sazon-verdeHoja shadow-sm dark:bg-sazon-verdeNutresaCard">
                    {String(indice + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-poppins text-sm font-semibold text-slate-800 dark:text-white">{receta.nombre}</span>
                    <span className="mt-1 block font-mono-tag text-[10px] text-slate-500 dark:text-slate-400">{receta.marca}</span>
                  </span>
                  <span className="shrink-0 font-mono-tag text-[10px] text-sazon-verdeHondo dark:text-sazon-verdeNeon">{receta.tiempo}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 px-5 py-8 text-center dark:border-emerald-800">
              <i className="bi bi-bookmark-plus text-2xl text-sazon-verdeHoja" />
              <p className="mb-0 mt-2 text-sm text-slate-600 dark:text-slate-300">Aún no has agregado recetas a esta colección.</p>
            </div>
          )}
        </Modal>
      )}
    </section>
  )
}

export default Colecciones
