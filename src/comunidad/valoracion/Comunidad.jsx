import { useState } from 'react'
import RecetaDestacada from './RecetaDestacada'
import DistribucionPuntuacion from './DistribucionPuntuacion'
import GarantiaComunitaria from './GarantiaComunitaria'
import FormularioValoracion from './FormularioValoracion'
import ResenasComunidad from './ResenasComunidad'
import AvisoModeracion from './AvisoModeracion'
import { DISTRIBUCION, RECETA_DESTACADA, RESENAS } from './data'

const USUARIO_ACTUAL = {
  autor: 'Mariana Morales',
  iniciales: 'MM',
  colorAvatar: 'bg-sazon-verdeHondo',
  ciudad: 'Medellín',
  rol: 'Chef Comunidad NV. 3',
}

const NOMBRES_CRITERIO = { sabor: 'Sabor', facilidad: 'Facilidad', ahorro: 'Ahorro' }

/**
 * Página HU-02 · Valoraciones de recetas (Célula 6 · Comunidad & Co-Creación).
 * Pensada para renderizarse dentro de <Header> (sidebar, topbar y footer globales).
 */
function Comunidad({ receta = RECETA_DESTACADA, distribucion = DISTRIBUCION, resenasIniciales = RESENAS }) {
  const [resenas, setResenas] = useState(resenasIniciales)
  const [mensaje, setMensaje] = useState('')

  const alternarMeGusta = (id) => {
    setResenas((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, leGusta: !r.leGusta, meGusta: r.meGusta + (r.leGusta ? -1 : 1) } : r,
      ),
    )
  }

  const publicarValoracion = ({ puntuacion, criterios, comentario, foto }) => {
    const [mejorId, mejorValor] = Object.entries(criterios).sort((a, b) => b[1] - a[1])[0]
    const nueva = {
      ...USUARIO_ACTUAL,
      id: Date.now(),
      verificado: false,
      hace: 'Justo ahora',
      fecha: new Date().toISOString(),
      puntuacion,
      criterioDestacado: `${NOMBRES_CRITERIO[mejorId]} ${mejorValor}/5`,
      texto: comentario || 'Sin comentarios adicionales.',
      imagenUrl: foto ? URL.createObjectURL(foto) : null,
      truco: null,
      meGusta: 0,
      leGusta: false,
      respuestas: 0,
    }
    setResenas((prev) => [nueva, ...prev])
    setMensaje('¡Gracias! Tu valoración fue enviada a moderación.')
    setTimeout(() => setMensaje(''), 4000)
  }

  const reportar = () => {
    setMensaje('Gracias por ayudarnos. El equipo de moderación revisará el contenido.')
    setTimeout(() => setMensaje(''), 4000)
  }

  return (
    <section className="space-y-8">
      <p className="text-xs font-mono-tag text-sazon-texto2 dark:text-slate-400 m-0">
        MÓDULO: <strong className="text-sazon-verdeNoche dark:text-sazon-verdeNeon">Célula 06 · Comunidad &amp; Co-Creación</strong> /
        Valoraciones (HU-02)
      </p>

      <RecetaDestacada receta={receta} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <DistribucionPuntuacion distribucion={distribucion} />
          <GarantiaComunitaria />
        </div>
        <div className="lg:col-span-3">
          <FormularioValoracion onPublicar={publicarValoracion} />
        </div>
      </div>

      <ResenasComunidad
        resenas={resenas}
        totalVerificadas={receta.totalEvaluaciones}
        onMeGusta={alternarMeGusta}
      />

      <AvisoModeracion onReportar={reportar} />

      {mensaje && (
        <p
          role="status"
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-sazon-verdeNoche text-white text-sm px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 m-0"
        >
          <i className="bi bi-check-circle-fill text-sazon-verdeNeon"></i>
          {mensaje}
        </p>
      )}
    </section>
  )
}

export default Comunidad
