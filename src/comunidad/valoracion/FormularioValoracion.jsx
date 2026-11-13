import { useState } from 'react'
import Estrellas from './Estrellas'
import CriterioSlider from './CriterioSlider'
import SubirFoto from './SubirFoto'
import { CRITERIOS_FORMULARIO, ETIQUETAS_PUNTUACION } from './data'

const MAX_CARACTERES = 400

const criteriosIniciales = () => Object.fromEntries(CRITERIOS_FORMULARIO.map((c) => [c.id, c.inicial]))

function FormularioValoracion({ onPublicar }) {
  const [puntuacion, setPuntuacion] = useState(0)
  const [criterios, setCriterios] = useState(criteriosIniciales)
  const [comentario, setComentario] = useState('')
  const [foto, setFoto] = useState(null)
  const [error, setError] = useState('')

  const actualizarCriterio = (id, valor) => setCriterios((prev) => ({ ...prev, [id]: valor }))

  const manejarEnvio = (e) => {
    e.preventDefault()
    if (!puntuacion) {
      setError('Selecciona una puntuación general antes de publicar.')
      return
    }
    setError('')
    onPublicar?.({ puntuacion, criterios, comentario: comentario.trim(), foto })
    setPuntuacion(0)
    setCriterios(criteriosIniciales())
    setComentario('')
    setFoto(null)
  }

  return (
    <form
      onSubmit={manejarEnvio}
      className="bg-white dark:bg-sazon-verdeNutresaCard rounded-2xl border border-black/5 dark:border-white/10 shadow-sm p-5 sm:p-6 space-y-5"
      noValidate
    >
      <header className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-poppins text-lg font-semibold text-sazon-verdeNoche dark:text-white flex items-center gap-2 m-0">
          <span className="w-3 h-3 rounded-full bg-sazon-verdeHoja"></span>
          Calificar esta Creación
        </h2>
        <span className="text-[11px] font-mono-tag uppercase text-sazon-texto2 dark:text-slate-400">
          Paso 1 de 1 · Criterio obligatorio
        </span>
      </header>

      <fieldset className="bg-sazon-marfil dark:bg-sazon-verdeNutresa rounded-xl p-5 text-center border-0 m-0">
        <legend className="sr-only">Puntuación general</legend>
        <p className="text-sm font-semibold text-sazon-texto dark:text-slate-200 m-0">
          ¿Qué puntuación general otorgas? <span className="text-sazon-brandZenu">*</span>
        </p>
        <p className="text-sm text-sazon-texto2 dark:text-slate-400 mb-3 mt-1">
          Haz clic sobre las estrellas para registrar tu nota
        </p>
        <Estrellas valor={puntuacion} onChange={setPuntuacion} tamano="text-4xl" />
        {puntuacion > 0 && (
          <p className="mt-3 m-0">
            <span className="inline-block bg-sazon-verdeNoche text-white text-xs font-bold px-3 py-1 rounded-full">
              {puntuacion}.0 ★ {ETIQUETAS_PUNTUACION[puntuacion]}
            </span>
          </p>
        )}
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {CRITERIOS_FORMULARIO.map((c) => (
          <CriterioSlider key={c.id} {...c} valor={criterios[c.id]} onChange={actualizarCriterio} />
        ))}
      </div>

      <div>
        <label
          htmlFor="comentario-valoracion"
          className="flex justify-between text-xs text-sazon-texto dark:text-slate-200 mb-1.5"
        >
          <span>Cuéntale a la comunidad tus trucos o variaciones:</span>
          <span className="text-sazon-texto2 dark:text-slate-400">
            {comentario.length} / {MAX_CARACTERES}
          </span>
        </label>
        <textarea
          id="comentario-valoracion"
          rows={3}
          maxLength={MAX_CARACTERES}
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="¿Usaste menos sal? ¿Agregaste toque de Sello Rojo en salsa o Ducales molidas en la costra? Cuéntanos..."
          className="w-full rounded-xl bg-sazon-marfil dark:bg-sazon-verdeNutresa border border-black/5 dark:border-white/10 p-3 text-sm text-sazon-texto dark:text-slate-100 placeholder:text-sazon-texto2 dark:placeholder:text-slate-500 focus:outline-2 focus:outline-sazon-verdeHoja resize-y"
        ></textarea>
      </div>

      <SubirFoto archivo={foto} onChange={setFoto} />

      {error && (
        <p role="alert" className="text-sm text-sazon-brandZenu m-0">
          <i className="bi bi-exclamation-circle mr-1"></i>
          {error}
        </p>
      )}

      <footer className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-sazon-texto2 dark:text-slate-400 flex items-center gap-1.5 m-0">
          <i className="bi bi-shield-check"></i>
          Cumple con la Política de Convivencia y Datos
        </p>
        <button
          type="submit"
          className="bg-sazon-hoja hover:bg-sazon-verdeNeon text-sazon-verdeNoche font-poppins font-semibold text-lg px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition cursor-pointer"
        >
          <i className="bi bi-send"></i>
          Publicar Valoración
        </button>
      </footer>
    </form>
  )
}

export default FormularioValoracion
