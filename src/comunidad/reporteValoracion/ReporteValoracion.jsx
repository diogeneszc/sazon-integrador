import { useMemo, useState } from 'react'
import EstadisticasModeracion from './EstadisticasModeracion'
import FiltrosReportes from './FiltrosReportes'
import TablaReportes from './TablaReportes'
import DetalleReporteModal from './DetalleReporteModal'
import { REPORTES_INICIALES } from './data'

const FILTROS = [
  { id: 'todos', label: 'Todos' },
  { id: 'pendiente', label: 'Pendientes' },
  { id: 'aprobado', label: 'Aprobados' },
  { id: 'bloqueado', label: 'Bloqueados / Descartados' },
]

function ReporteValoracion() {
  const [reportes, setReportes] = useState(REPORTES_INICIALES)
  const [filtroActivo, setFiltroActivo] = useState('todos')
  const [busqueda, setBusqueda] = useState('')
  const [pagina, setPagina] = useState(1)
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const reportesPorPagina = 5

  const conteos = useMemo(
    () => reportes.reduce(
      (totales, reporte) => {
        totales[reporte.estado] += 1
        return totales
      },
      { pendiente: 0, aprobado: 0, bloqueado: 0 },
    ),
    [reportes],
  )

  const reportesFiltrados = useMemo(() => {
    const consulta = busqueda.trim().toLocaleLowerCase('es')
    return reportes.filter((reporte) => {
      const coincideEstado =
        filtroActivo === 'todos' ||
        (filtroActivo === 'bloqueado'
          ? reporte.estado === 'bloqueado'
          : reporte.estado === filtroActivo)
      const coincideBusqueda =
        !consulta ||
        [reporte.id, reporte.usuario, reporte.contenido, reporte.receta, reporte.marca]
          .join(' ')
          .toLocaleLowerCase('es')
          .includes(consulta)
      return coincideEstado && coincideBusqueda
    })
  }, [busqueda, filtroActivo, reportes])

  const totalPaginas = Math.max(1, Math.ceil(reportesFiltrados.length / reportesPorPagina))
  const reportesVisibles = reportesFiltrados.slice(
    (pagina - 1) * reportesPorPagina,
    pagina * reportesPorPagina,
  )

  const cambiarFiltro = (filtro) => {
    setFiltroActivo(filtro)
    setPagina(1)
  }

  const cambiarBusqueda = (valor) => {
    setBusqueda(valor)
    setPagina(1)
  }

  const resolverReporte = (id, estado) => {
    setReportes((actuales) =>
      actuales.map((reporte) =>
        reporte.id === id ? { ...reporte, estado } : reporte,
      ),
    )
    setReporteSeleccionado(null)
    setMensaje(estado === 'aprobado' ? 'Reporte aprobado.' : 'Contenido bloqueado.')
    window.setTimeout(() => setMensaje(''), 3500)
  }

  const exportarCSV = () => {
    const columnas = ['ID reporte', 'Usuario reporta', 'Contenido denunciado', 'Motivo', 'Receta', 'Marca', 'Fecha', 'Estado']
    const filas = reportesFiltrados.map((reporte) => [
      reporte.id,
      reporte.usuario,
      reporte.contenido,
      reporte.motivo,
      reporte.receta,
      reporte.marca,
      reporte.fecha,
      reporte.estado,
    ])
    const csv = [columnas, ...filas]
      .map((fila) => fila.map((celda) => `"${String(celda).replaceAll('"', '""')}"`).join(','))
      .join('\r\n')
    const archivo = new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(archivo)
    const enlace = document.createElement('a')
    enlace.href = url
    enlace.download = 'reportes-moderacion.csv'
    document.body.appendChild(enlace)
    enlace.click()
    enlace.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="m-0 flex flex-wrap items-center gap-2 text-[10px] font-mono-tag uppercase tracking-wider text-sazon-texto2 dark:text-slate-400">
            <span className="rounded-full bg-sazon-verdeHoja/10 px-2.5 py-1 font-bold text-sazon-verdeHondo dark:text-sazon-verdeNeon">
              <i className="bi bi-shield-check mr-1.5"></i>
              HU-CEL06-01 · Moderación y confianza
            </span>
            <span>v2.4 Nutresa Core</span>
          </p>
          <h1 className="m-0 font-poppins text-2xl font-extrabold tracking-tight text-[#322014] dark:text-white sm:text-3xl">
            Panel Administrativo de Moderación de Reportes
          </h1>
          <p className="m-0 max-w-3xl text-sm leading-6 text-sazon-texto2 dark:text-slate-300">
            Supervisión, filtrado y resolución en tiempo real de interacciones comunitarias.
            Protección de recetas co-creadas con marcas Zenú, Doria, Pietrán, Noel, Chocolisto y Sello Rojo.
          </p>
        </div>
        <div className="shrink-0 rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-[10px] font-mono-tag text-slate-500 shadow-sm dark:border-white/10 dark:bg-sazon-verdeNutresaCard dark:text-slate-300">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            <span>branch: <strong className="text-sazon-verdeHoja dark:text-sazon-verdeNeon">feature/comunidad/HU-01</strong></span>
          </div>
          <p className="m-0 mt-1 text-right">tabla: reporte_moderacion (SLA &lt; 20 min)</p>
        </div>
      </header>

      <EstadisticasModeracion
        pendientes={conteos.pendiente}
        aprobados={142 + Math.max(0, conteos.aprobado - 2)}
        bloqueados={12 + Math.max(0, conteos.bloqueado - 1)}
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm dark:border-white/10 dark:bg-sazon-verdeNutresaCard">
        <FiltrosReportes
          filtros={FILTROS}
          filtroActivo={filtroActivo}
          conteos={conteos}
          total={reportes.length}
          busqueda={busqueda}
          onCambiarFiltro={cambiarFiltro}
          onCambiarBusqueda={cambiarBusqueda}
          onExportar={exportarCSV}
        />
        <TablaReportes
          reportes={reportesVisibles}
          total={reportesFiltrados.length}
          pagina={pagina}
          totalPaginas={totalPaginas}
          inicio={(pagina - 1) * reportesPorPagina}
          onCambiarPagina={setPagina}
          onAbrirReporte={setReporteSeleccionado}
        />
      </div>

      {reporteSeleccionado && (
        <DetalleReporteModal
          reporte={reporteSeleccionado}
          onCerrar={() => setReporteSeleccionado(null)}
          onResolver={resolverReporte}
        />
      )}

      {mensaje && (
        <p
          role="status"
          className="fixed bottom-20 left-1/2 z-50 m-0 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-sazon-verdeNoche px-4 py-3 text-sm text-white shadow-xl"
        >
          <i className="bi bi-check-circle-fill text-sazon-verdeNeon"></i>
          {mensaje}
        </p>
      )}
    </section>
  )
}

export default ReporteValoracion
