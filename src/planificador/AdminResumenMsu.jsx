import { useState } from 'react';

const MOCK_PLANES = [
  { id: 'USR-8012', nombre: 'Plan Balanceado Nutresa S1', rango: 'Semana 1 (Octubre)', comidas: 28, estado: 'activo' },
  { id: 'USR-9231', nombre: 'Minuta Proteica Ejecutiva', rango: 'Semana 2 (Octubre)', comidas: 24, estado: 'activo' },
  { id: 'USR-1104', nombre: 'Plan Vegetariano Institucional', rango: 'Semana 3 (Octubre)', comidas: 26, estado: 'borrador' },
  { id: 'USR-4432', nombre: 'Control Calórico Bajo en Sodio', rango: 'Semana 4 (Septiembre)', comidas: 28, estado: 'archivado' },
  { id: 'USR-7719', nombre: 'Plan Deportivo Alta Energía', rango: 'Semana 5 (Octubre)', comidas: 28, estado: 'activo' }
];

export default function AdminResumen() {
  const [planes] = useState(() => {
    try {
      const storedPlanes = localStorage.getItem('planesMenu');
      if (storedPlanes) {
        return JSON.parse(storedPlanes);
      }
      localStorage.setItem('planesMenu', JSON.stringify(MOCK_PLANES));
      return MOCK_PLANES;
    } catch (error) {
      console.error('Error al cargar planes desde localStorage:', error);
      return MOCK_PLANES;
    }
  });

  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');

  const [planSeleccionado, setPlanSeleccionado] = useState(null);
  const [isInspectOpen, setIsInspectOpen] = useState(false);

  const planesFiltrados = planes.filter(plan => {
    const coincideTexto = plan.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
                          plan.id.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtroEstado === 'todos' || plan.estado === filtroEstado;
    return coincideTexto && coincideEstado;
  });

  const abrirInspeccion = (plan) => {
    setPlanSeleccionado(plan);
    setIsInspectOpen(true);
  };

  const cerrarInspeccion = () => {
    setIsInspectOpen(false);
    setPlanSeleccionado(null);
  };

  const handleNuevoPlan = () => {
    alert('Abriendo creador de nuevo plan de menú base...');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 w-full py-6 px-4">
      {/* NAVEGACIÓN BREADCRUMB */}
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <li><a href="dashboard-general.html" className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200">Inicio</a></li>
          <li aria-hidden="true"><i className="bi bi-chevron-right text-[10px]"></i></li>
          <li><span className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700">Planificador</span></li>
          <li aria-hidden="true"><i className="bi bi-chevron-right text-[10px]"></i></li>
          <li><span className="px-2.5 py-1 rounded-md bg-emerald-800 text-stone-100 font-semibold" aria-current="page">Resumen de Planes</span></li>
        </ol>
      </nav>

      {/* CABECERA DE MÓDULO */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Módulo Admin • Nutresa Culinary Cloud</span>
          <h1 className="text-2xl font-bold text-emerald-950 tracking-tight mt-0.5 font-['Poppins']">Resumen Estadístico de Planes de Menú</h1>
          <p className="text-sm text-stone-600 mt-1">Supervisión integral de planeación culinaria e inventario de minutas alimentarias.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleNuevoPlan} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-lime-500 text-emerald-950 font-bold text-sm shadow-sm hover:opacity-90 transition-all font-mono">
            <i className="bi bi-plus-lg" aria-hidden="true"></i>
            <span className="hidden lg:inline">Nuevo Plan Base</span>
          </button>
          <button onClick={() => alert('Exportando métricas estadísticas...')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-emerald-950 font-bold text-sm border border-stone-200 shadow-sm hover:bg-stone-100 transition-all font-mono">
            <i className="bi bi-download" aria-hidden="true"></i>
            <span className="hidden lg:inline">Exportar Métricas</span>
          </button>
        </div>
      </div>

      {/* TARJETAS KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-semibold text-stone-600 font-mono">Total Planes Creados</span>
            <i className="bi bi-journal-check text-emerald-800 text-xl" aria-hidden="true"></i>
          </div>
          <div>
            <span className="text-3xl font-bold text-emerald-950 font-mono">{planes.length + 1423}</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-stone-100 text-emerald-700 ml-2 font-mono">+12%</span>
          </div>
        </div>
        <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-semibold text-stone-600 font-mono">Promedio Comidas/Usuario</span>
            <i className="bi bi-egg-fried text-emerald-800 text-xl" aria-hidden="true"></i>
          </div>
          <div>
            <span className="text-3xl font-bold text-emerald-950 font-mono">18.4</span>
            <span className="text-xs text-stone-600 font-mono"> / 28 comidas</span>
          </div>
        </div>
        <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-semibold text-stone-600 font-mono">Ingrediente Top #1</span>
            <i className="bi bi-award text-emerald-800 text-xl" aria-hidden="true"></i>
          </div>
          <div>
            <span className="text-2xl font-bold text-emerald-950 font-['Poppins']">Pechuga</span>
            <span className="text-xs text-stone-600 block font-mono">612 minutas preparadas</span>
          </div>
        </div>
        <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-semibold text-stone-600 font-mono">Equilibrio Saludable</span>
            <i className="bi bi-heart-pulse text-emerald-800 text-xl" aria-hidden="true"></i>
          </div>
          <div>
            <span className="text-3xl font-bold text-emerald-950 font-mono">74%</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-stone-100 text-emerald-700 ml-2 font-mono">Óptimo</span>
          </div>
        </div>
      </div>

      {/* GRÁFICOS Y ESTADÍSTICAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-xl p-6 shadow-sm border border-stone-200 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-lg text-emerald-950 font-['Poppins']">Volumen de Planes Creados</h2>
              <p className="text-xs text-stone-600">Distribución semanal en el ciclo bimensual actual</p>
            </div>
            <div className="flex bg-stone-100 rounded-lg p-1 text-xs font-bold font-mono">
              <button className="px-3 py-1 rounded-md bg-white shadow-sm text-emerald-800">Semanas</button>
              <button className="px-3 py-1 rounded-md text-stone-600 hover:text-emerald-950">Meses</button>
            </div>
          </div>
          <div className="h-48 flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-stone-200">
            <div className="flex flex-col items-center gap-2 w-full"><span className="text-xs text-stone-600 font-bold font-mono">140</span><div className="w-full bg-stone-200 rounded-t-lg h-20"></div><span className="text-xs font-bold text-stone-600 font-mono">S1</span></div>
            <div className="flex flex-col items-center gap-2 w-full"><span className="text-xs text-stone-600 font-bold font-mono">165</span><div className="w-full bg-stone-200 rounded-t-lg h-24"></div><span className="text-xs font-bold text-stone-600 font-mono">S2</span></div>
            <div className="flex flex-col items-center gap-2 w-full"><span className="text-xs text-stone-600 font-bold font-mono">198</span><div className="w-full bg-stone-200 rounded-t-lg h-28"></div><span className="text-xs font-bold text-stone-600 font-mono">S3</span></div>
            <div className="flex flex-col items-center gap-2 w-full"><span className="text-xs text-stone-600 font-bold font-mono">180</span><div className="w-full bg-stone-200 rounded-t-lg h-[6.4rem]"></div><span className="text-xs font-bold text-stone-600 font-mono">S4</span></div>
            <div className="flex flex-col items-center gap-2 w-full"><span className="text-xs text-stone-600 font-bold font-mono">215</span><div className="w-full bg-stone-200 rounded-t-lg h-32"></div><span className="text-xs font-bold text-stone-600 font-mono">S5</span></div>
            <div className="flex flex-col items-center gap-2 w-full"><span className="text-xs text-stone-600 font-bold font-mono">240</span><div className="w-full bg-stone-200 rounded-t-lg h-36"></div><span className="text-xs font-bold text-stone-600 font-mono">S6</span></div>
            <div className="flex flex-col items-center gap-2 w-full"><span className="text-xs text-stone-600 font-bold font-mono">230</span><div className="w-full bg-stone-200 rounded-t-lg h-[8.5rem]"></div><span className="text-xs font-bold text-stone-600 font-mono">S7</span></div>
            <div className="flex flex-col items-center gap-2 w-full"><span className="text-xs text-emerald-800 font-bold font-mono">290</span><div className="w-full bg-emerald-800 rounded-t-lg h-40"></div><span className="text-xs font-bold text-emerald-950 font-mono">S8*</span></div>
          </div>
          <div className="flex items-center justify-between mt-3 text-xs font-mono">
            <span className="font-semibold text-emerald-950 flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-800"></span> Semana 8 en curso: Récord institucional</span>
            <span className="font-bold text-emerald-700 bg-stone-100 px-2.5 py-0.5 rounded-full">+26% vs. promedio</span>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-xl p-6 shadow-sm border border-stone-200 flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-lg text-emerald-950 font-['Poppins']">Estado de Planes</h2>
            <p className="text-xs text-stone-600">Ratio de actividad y adherencia mensual</p>
          </div>
          <div className="flex items-center justify-center my-4 relative">
            <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-stone-200" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-emerald-800" strokeDasharray="68, 100" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-emerald-950 font-mono">68%</span>
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-700 font-mono">Activos</span>
            </div>
          </div>
          <div className="space-y-2 text-xs border-t border-stone-200 pt-3 font-mono">
            <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-800"></span> Planes Activos</span><span className="font-bold text-emerald-950">971 (68%)</span></div>
            <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Borradores en Progreso</span><span className="font-bold text-emerald-950">314 (22%)</span></div>
            <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-stone-300"></span> Archivados / Completos</span><span className="font-bold text-emerald-950">143 (10%)</span></div>
          </div>
        </div>
      </div>

      {/* TOP 5 Y SELLO INSTITUCIONAL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-xl p-6 shadow-sm border border-stone-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-lg text-emerald-950 font-['Poppins']">Top 5 Ingredientes Más Frecuentes</h2>
              <p className="text-xs text-stone-600">Frecuencia en recetas planificadas dentro de minutas institucionales</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-stone-100 text-xs font-bold text-emerald-800 font-mono">8,420 recetas</span>
          </div>
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=80&q=80" alt="Pollo" className="w-10 h-10 rounded-lg object-cover flex-shrink-0 shadow-sm" />
              <div className="flex-1">
                <div className="flex justify-between font-semibold mb-1"><span className="text-emerald-950 font-bold">1. Pollo / Pechuga fresca</span><span className="text-emerald-800 font-bold">1,480 minutas (38%)</span></div>
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden"><div className="bg-emerald-800 h-full rounded-full" style={{width: '88%'}}></div></div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=80&q=80" alt="Arroz" className="w-10 h-10 rounded-lg object-cover flex-shrink-0 shadow-sm" />
              <div className="flex-1">
                <div className="flex justify-between font-semibold mb-1"><span className="text-emerald-950 font-bold">2. Arroz Integral / Blanco</span><span className="text-emerald-800 font-bold">1,210 minutas (32%)</span></div>
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden"><div className="bg-emerald-700 h-full rounded-full" style={{width: '76%'}}></div></div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=80&q=80" alt="Espinacas" className="w-10 h-10 rounded-lg object-cover flex-shrink-0 shadow-sm" />
              <div className="flex-1">
                <div className="flex justify-between font-semibold mb-1"><span className="text-emerald-950 font-bold">3. Espinacas Tiernas</span><span className="text-emerald-800 font-bold">945 minutas (25%)</span></div>
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden"><div className="bg-emerald-700 h-full rounded-full" style={{width: '61%'}}></div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-emerald-900 rounded-xl p-6 text-white flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div>
            <span className="text-xs uppercase font-bold text-lime-400 tracking-wider font-mono">SELLO DE EXCELENCIA INSTITUCIONAL</span>
            <h3 className="text-2xl font-bold mt-2 font-['Poppins']">Estandarización Culinaria Sazón</h3>
            <p className="text-xs opacity-90 mt-2 leading-relaxed">Supervisión en tiempo real de alérgenos, gramajes y aportes calóricos certificados bajo la normativa institucional del Grupo Nutresa.</p>
          </div>
          <div className="my-4 bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-xl border border-white border-opacity-10 space-y-2 font-mono">
            <div className="flex items-center gap-2 text-xs font-bold text-lime-400"><i className="bi bi-patch-check text-sm" aria-hidden="true"></i><span>Recomendación Semanal Automática</span></div>
            <p className="text-xs opacity-80">Optimizar aporte de vegetales frescos con hidratación balanceada.</p>
          </div>
          <button onClick={() => alert('Mostrando fichas técnicas institucionales...')} className="w-full py-2.5 rounded-xl bg-lime-400 text-emerald-950 font-bold text-sm hover:opacity-90 transition-all shadow-sm flex items-center justify-center gap-2 font-mono">
            <span>Ver Fichas Técnicas</span>
            <i className="bi bi-arrow-right text-sm" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      {/* TABLA DE PLANES CONECTADA A LOCALSTORAGE */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden space-y-4 p-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <i className="bi bi-search absolute left-3 top-2.5 text-stone-500 text-sm" aria-hidden="true"></i>
            <input 
              type="text" 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por ID de Usuario o Nombre de Plan..." 
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-100 border border-stone-200 text-xs focus:outline-none focus:border-emerald-800 font-mono"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto justify-end text-xs font-mono">
            <select 
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="px-3 py-2 rounded-xl bg-stone-100 border border-stone-200 font-semibold text-stone-700 focus:outline-none"
            >
              <option value="todos">Todos los Estados</option>
              <option value="activo">Activo</option>
              <option value="borrador">Borrador</option>
              <option value="archivado">Archivado</option>
            </select>
            <button 
              type="button" 
              onClick={() => { setBusqueda(''); setFiltroEstado('todos'); }}
              className="text-red-600 font-bold hover:underline px-2 inline-flex items-center gap-1"
            >
              <i className="bi bi-x-circle" aria-hidden="true"></i>
              <span className="hidden lg:inline">Limpiar Filtros</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-stone-100 uppercase font-bold text-stone-700 border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">ID Usuario</th>
                <th className="py-3 px-4">Nombre del Plan</th>
                <th className="py-3 px-4">Rango Semanal</th>
                <th className="py-3 px-4">Comidas</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-700">
              {planesFiltrados.length > 0 ? (
                planesFiltrados.map((plan, index) => (
                  <tr key={index} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-emerald-950">{plan.id}</td>
                    <td className="py-3 px-4 font-medium">{plan.nombre}</td>
                    <td className="py-3 px-4">{plan.rango || 'Semana Actual'}</td>
                    <td className="py-3 px-4">{plan.comidas || 28}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        plan.estado === 'activo' ? 'bg-emerald-100 text-emerald-800' :
                        plan.estado === 'borrador' ? 'bg-amber-100 text-amber-800' : 'bg-stone-200 text-stone-700'
                      }`}>
                        {plan.estado}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button 
                        onClick={() => abrirInspeccion(plan)}
                        className="px-3 py-1 rounded-lg bg-emerald-800 text-white font-bold hover:bg-emerald-900 transition-colors"
                      >
                        Auditar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-stone-400 italic">
                    No se encontraron planes registrados en el almacenamiento local.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PANEL LATERAL DE AUDITORÍA */}
      {isInspectOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-emerald-950 bg-opacity-40 backdrop-blur-sm" onClick={cerrarInspeccion}></div>
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              <div className="flex items-center gap-4 p-5 border-b border-stone-200 bg-stone-100">
                <button onClick={cerrarInspeccion} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-emerald-800 hover:bg-stone-200 font-bold text-sm border border-stone-200 bg-white">
                  <i className="bi bi-arrow-left text-[18px]"></i>
                  <span>Volver</span>
                </button>
                <div>
                  <h2 className="font-bold text-emerald-950 text-lg leading-tight">Auditoría Nutricional</h2>
                  <p className="text-[11px] text-stone-600 font-bold uppercase tracking-wider">{planSeleccionado?.id}</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6 font-mono text-xs">
                <div>
                  <span className="px-2.5 py-1 rounded-full bg-stone-100 text-emerald-800 text-[10px] font-bold uppercase">Plan Seleccionado</span>
                  <h3 className="text-xl font-bold text-emerald-950 mt-2 font-['Poppins']">{planSeleccionado?.nombre}</h3>
                  <p className="text-stone-600 mt-1">Configurado para 28 comidas semanales auditadas.</p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-emerald-950 text-sm border-b pb-1">Macronutrientes</h4>
                  <div>
                    <div className="flex justify-between mb-1"><span>Proteínas (30%)</span><span className="text-emerald-800 font-bold">32%</span></div>
                    <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden"><div className="bg-emerald-800 h-full" style={{width: '32%'}}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1"><span>Carbohidratos (50%)</span><span className="text-amber-600 font-bold">45%</span></div>
                    <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden"><div className="bg-amber-500 h-full" style={{width: '45%'}}></div></div>
                  </div>
                </div>
                <div className="bg-stone-100 p-4 rounded-xl border border-emerald-800 border-opacity-20 flex items-start gap-3">
                  <i className="bi bi-shield-check text-emerald-700 text-lg"></i>
                  <div>
                    <h5 className="font-bold text-emerald-950">Aprobado por Célula de Nutrición</h5>
                    <p className="text-[11px] text-stone-600 mt-0.5">Cumple con los estándares normativos del Grupo Nutresa.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-stone-200 bg-stone-100 flex gap-3">
                <button onClick={() => alert('Generando Ficha Técnica PDF...')} className="w-full py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-sm">
                  Descargar Ficha PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}