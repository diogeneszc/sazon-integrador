import { useEffect, useState } from 'react';
import { recetaServicio } from '../services/recetaServicio';
import '../styles/recetario.css';

// Formateador numérico para enteros o decimales según la proporción 
function formatearCantidadNumerica(cantidadBase, porcionesActuales, porcionesBase) {
  const valorCalculado = (Number(cantidadBase) * Number(porcionesActuales)) / Number(porcionesBase);
  if (Number.isInteger(valorCalculado)) {
    return valorCalculado.toString();
  }
  return Number(valorCalculado.toFixed(1)).toString();
}

function RecetaIngredientesVista({ recetaId = 128, onIniciarModoCocina }) {
  const [datosVista, setDatosVista] = useState(null);
  const [porciones, setPorciones] = useState(4);
  const [estadoDespensa, setEstadoDespensa] = useState({});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;

    const cargarIngredientes = async () => {
      try {
        const respuesta = await recetaServicio.obtenerIngredientesDeReceta(recetaId);
        if (activo) {
          setDatosVista(respuesta);
          setPorciones(respuesta.recetaResumen.porcionesBase);
          const mapaInicial = {};
          respuesta.ingredientes.forEach((ing) => {
            mapaInicial[ing.id] = ing.enDespensa;
          });
          setEstadoDespensa(mapaInicial);
          setError(null);
        }
      } catch (err) {
        if (activo) {
          setError(err.message);
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    cargarIngredientes();

    return () => {
      activo = false;
    };
  }, [recetaId]);

  const notificar = (mensaje) => {
    if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
      window.showToast(mensaje);
    }
  };

  const cambiarPorciones = (delta) => {
    setPorciones((prev) => {
      const nuevo = prev + delta;
      if (nuevo < 1) return 1;
      if (nuevo > 20) return 20;
      return nuevo;
    });
  };

  const alternarDisponibilidad = (idIngrediente, nombreProducto) => {
    setEstadoDespensa((prev) => {
      const nuevoEstado = !prev[idIngrediente];
      notificar(
        nuevoEstado
          ? `${nombreProducto}: disponible en tu despensa`
          : `${nombreProducto}: marcado para compra en 1-clic`
      );
      return { ...prev, [idIngrediente]: nuevoEstado };
    });
  };

  const marcarTodosEnDespensa = () => {
    if (!datosVista) return;
    const todosMarcados = {};
    datosVista.ingredientes.forEach((ing) => {
      todosMarcados[ing.id] = true;
    });
    setEstadoDespensa(todosMarcados);
    notificar('Todos los ingredientes fueron verificados en tu estación Mise en Place');
  };

  if (cargando) {
    return (
      <section className="receta-detalle-container" aria-busy="true">
        <article className="receta-detalle-card p-10 text-center space-y-3">
          <i className="bi bi-arrow-repeat animate-spin text-3xl text-sazon-verdeHoja inline-block"></i>
          <p className="font-mono-tag text-xs text-slate-600 dark:text-slate-300 m-0">
            Consultando productos oficiales Nutresa e ingredientes...
          </p>
        </article>
      </section>
    );
  }

  if (error || !datosVista) {
    return (
      <section className="receta-detalle-container" role="alert">
        <article className="receta-detalle-card p-8 text-center space-y-3">
          <i className="bi bi-exclamation-triangle text-2xl text-red-600"></i>
          <h2 className="font-poppins font-bold text-lg m-0">Error al cargar ingredientes</h2>
          <p className="font-inter text-xs text-slate-500 m-0">{error}</p>
        </article>
      </section>
    );
  }

  const { recetaResumen, ingredientes } = datosVista;

  return (
    <article className="receta-detalle-container">
      {/* 1. CABECERA Y SELECTOR DINÁMICO DE PORCIONES */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <section className="space-y-2.5 max-w-2xl">
          <span className="w-9 h-9 rounded-full bg-sazon-verdeHoja text-white inline-flex items-center justify-center text-sm shadow-xs">
            <i className="bi bi-journal-check"></i>
          </span>
          <h1 className="font-poppins font-black text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight m-0">
            Ingredientes Seleccionados
          </h1>
          <p className="font-inter text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed m-0">
            {recetaResumen.subtituloIngredientes}
          </p>
        </section>

        {/* Control de Porciones */}
        <aside
          aria-label="Calculadora de porciones"
          className="receta-detalle-card px-4 py-2.5 flex items-center gap-3 self-start lg:self-end"
        >
          <span className="font-mono-tag text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-300 flex items-center gap-1.5">
            <i className="bi bi-people-fill text-sazon-verdeHoja dark:text-sazon-verdeNeon"></i>
            <span>PORCIONES:</span>
          </span>

          <button
            type="button"
            onClick={() => cambiarPorciones(-1)}
            aria-label="Disminuir porciones"
            className="w-7 h-7 rounded-full bg-slate-100 dark:bg-sazon-verdeNutresa text-slate-700 dark:text-white hover:bg-slate-200 font-mono-tag text-sm font-bold flex items-center justify-center cursor-pointer transition-colors"
          >
            -
          </button>

          <output className="font-poppins font-extrabold text-sm text-slate-900 dark:text-white min-w-14 text-center">
            {porciones} Porc
          </output>

          <button
            type="button"
            onClick={() => cambiarPorciones(1)}
            aria-label="Aumentar porciones"
            className="w-7 h-7 rounded-full bg-sazon-verdeHondo text-white hover:bg-sazon-verdeNoche font-mono-tag text-sm font-bold flex items-center justify-center cursor-pointer transition-colors shadow-xs"
          >
            +
          </button>
        </aside>
      </header>

      {/* 2. BLOQUE SUPERIOR: IMAGEN DEL PLATO + TARJETA INGREDIENTE ESTRELLA NUTRESA */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <figure className="receta-detalle-card p-3 lg:col-span-7 flex flex-col justify-between m-0">
          <section className="receta-ing-hero-wrap">
            <img
              src={recetaResumen.imagenPrincipal}
              alt={recetaResumen.titulo}
              className="receta-detalle-hero-img"
            />
            <section className="absolute bottom-3 left-3 flex flex-wrap items-center gap-2 z-10">
              <span className="bg-white/95 text-slate-800 px-3 py-1 rounded-full font-mono-tag text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
                <i className="bi bi-speedometer2 text-sazon-verdeHoja"></i>
                <span>Dificultad: {recetaResumen.dificultad}</span>
              </span>
              <span className="bg-white/95 text-slate-800 px-3 py-1 rounded-full font-mono-tag text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
                <i className="bi bi-clock text-orange-600"></i>
                <span>Tiempo: {recetaResumen.tiempoMiseEnPlace}</span>
              </span>
            </section>
          </section>

          <figcaption className="px-2 pt-3 pb-1 flex items-center justify-between text-xs">
            <span className="font-inter text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sazon-verdeHoja"></span>
              <span>Verificado por Academia Gastronómica Nutresa</span>
            </span>
            <strong className="font-mono-tag text-[11px] text-slate-400 uppercase">
              {recetaResumen.codigoRecetaVerificada}
            </strong>
          </figcaption>
        </figure>

        {/* Tarjeta de Ingrediente Estrella */}
        <aside className="receta-detalle-card p-6 lg:col-span-5 flex flex-col justify-between space-y-5">
          <section className="space-y-4">
            <header className="flex items-start justify-between gap-3">
              <section className="space-y-1">
                <span className="font-mono-tag text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 flex items-center gap-1.5">
                  <i className="bi bi-star-fill"></i>
                  <span>{recetaResumen.ingredienteEstrella.etiqueta}</span>
                </span>
                <h2 className="font-poppins font-extrabold text-2xl text-slate-900 dark:text-white leading-tight m-0">
                  {recetaResumen.ingredienteEstrella.nombre}
                </h2>
              </section>

              <span className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-sazon-verdeHoja dark:text-sazon-verdeNeon flex items-center justify-center text-base shrink-0">
                <i className="bi bi-award-fill"></i>
              </span>
            </header>

            <p className="font-inter text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed m-0">
              {recetaResumen.ingredienteEstrella.descripcion}
            </p>

            {/* Indicador de Aporte Proteico */}
            <section className="receta-detalle-subcard p-4 space-y-2.5">
              <header className="flex items-center justify-between text-xs">
                <span className="font-poppins font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                  <i className="bi bi-lightning-charge-fill text-sazon-verdeHoja dark:text-sazon-verdeNeon"></i>
                  <span>{recetaResumen.ingredienteEstrella.aporteProteicoLabel}</span>
                </span>
                <strong className="font-mono-tag text-xs text-sazon-verdeHondo dark:text-sazon-verdeNeon">
                  {recetaResumen.ingredienteEstrella.aporteProteicoValor}
                </strong>
              </header>

              <section className="receta-ing-progress-track">
                <section className="receta-ing-progress-bar"></section>
              </section>

              <footer className="flex items-center justify-between font-mono-tag text-[10px] text-slate-500 dark:text-slate-400">
                <span>{recetaResumen.ingredienteEstrella.notaIzquierda}</span>
                <span>{recetaResumen.ingredienteEstrella.notaDerecha}</span>
              </footer>
            </section>
          </section>

          <button
            type="button"
            onClick={() =>
              notificar('Abriendo catálogo oficial Grupo Nutresa para compra directa...')
            }
            className="receta-detalle-btn-primary w-full py-3 px-5 rounded-xl font-mono-tag text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-md cursor-pointer"
          >
            <i className="bi bi-bag-check-fill text-sm"></i>
            <span>COMPRAR INGREDIENTES NUTRESA</span>
          </button>
        </aside>
      </section>

      {/* 3. TABLA SEMÁNTICA DE INGREDIENTES (.receta-ingredientes-lista) */}
      <section
        aria-labelledby="titulo-mise-en-place"
        className="receta-detalle-card p-5 sm:p-7 space-y-5"
      >
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-4">
          <section className="space-y-1">
            <h2
              id="titulo-mise-en-place"
              className="font-poppins font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white m-0"
            >
              Desglose de Despensa • Mise en Place
            </h2>
            <p className="font-inter text-xs text-slate-500 dark:text-slate-400 m-0">
              Ponderación calibrada para exactitud térmica y sabor balanceado.
            </p>
          </section>

          <button
            type="button"
            onClick={marcarTodosEnDespensa}
            className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-sazon-verdeNutresa text-slate-700 dark:text-slate-200 hover:bg-sazon-verdeHoja hover:text-white font-mono-tag text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <i className="bi bi-check2-all"></i>
            <span>Marcar Todos</span>
          </button>
        </header>

        {/* Contenedor Responsivo con la Tabla Semántica exigida en Criterios #2 y #4 */}
        <section className="receta-ingredientes-tabla-wrap">
          <table className="receta-ingredientes-lista">
            <caption>
              Ingredientes oficiales y productos Grupo Nutresa para {porciones} porciones
            </caption>
            <thead>
              <tr>
                <th scope="col">INGREDIente / PRODUCTO NUTRESA</th>
                <th scope="col">CANTIDAD EXACTA</th>
                <th scope="col">MARCA OFICIAL</th>
                <th scope="col">DISPONIBILIDAD</th>
                <th scope="col">ACCIÓN RÁPIDA</th>
              </tr>
            </thead>
            <tbody>
              {ingredientes.map((item) => {
                const cantidadFormateada = formatearCantidadNumerica(
                  item.cantidadBase,
                  porciones,
                  recetaResumen.porcionesBase
                );
                const disponible = Boolean(estadoDespensa[item.id]);

                return (
                  <tr key={item.id}>
                    <td>
                      <section className="flex items-center gap-3.5">
                        <span
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-sm shrink-0 ${item.claseIcono}`}
                        >
                          <i className={`bi ${item.icono}`}></i>
                        </span>
                        <section>
                          <strong className="font-poppins font-bold text-sm text-slate-900 dark:text-white block leading-snug">
                            {item.nombre}
                          </strong>
                          <span className="font-inter text-xs text-slate-500 dark:text-slate-400 block">
                            {item.preparacion}
                          </span>
                        </section>
                      </section>
                    </td>

                    <td>
                      <output className="font-mono-tag font-bold text-xs sm:text-sm text-sazon-verdeHondo dark:text-sazon-verdeNeon">
                        {cantidadFormateada} {item.unidad}
                      </output>
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full font-mono-tag text-[11px] font-bold inline-block ${item.claseMarca}`}
                      >
                        {item.marca}
                      </span>
                    </td>

                    <td>
                      <span
                        className={
                          disponible
                            ? 'receta-ing-disp-ok px-3 py-1 rounded-full font-mono-tag text-[11px] font-bold inline-flex items-center gap-1.5'
                            : 'receta-ing-disp-buy px-3 py-1 rounded-full font-mono-tag text-[11px] font-bold inline-flex items-center gap-1.5'
                        }
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        <span>{disponible ? 'En despensa' : 'Comprar en 1-clic'}</span>
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        onClick={() => alternarDisponibilidad(item.id, item.nombre)}
                        title={
                          disponible
                            ? 'En despensa (clic para cambiar)'
                            : 'Agregar al carrito Nutresa en 1-clic'
                        }
                        className={
                          disponible
                            ? 'w-9 h-9 rounded-full bg-slate-100 dark:bg-sazon-verdeNutresa text-slate-600 dark:text-slate-300 hover:bg-slate-200 inline-flex items-center justify-center cursor-pointer transition-colors'
                            : 'w-9 h-9 rounded-full bg-amber-800 text-white hover:bg-amber-900 inline-flex items-center justify-center cursor-pointer transition-colors shadow-sm'
                        }
                      >
                        <i
                          className={`bi ${
                            disponible ? 'bi-basket2' : 'bi-bag-plus-fill'
                          } text-sm`}
                        ></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {/* Pie de Tabla: Llamado a la acción hacia Modo Cocina (HU 2.2.3) */}
        <footer className="receta-detalle-subcard p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <section className="flex items-center gap-3.5">
            <span className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 text-sazon-verdeHoja dark:text-sazon-verdeNeon flex items-center justify-center text-base shrink-0">
              <i className="bi bi-check2-square"></i>
            </span>
            <section>
              <h3 className="font-poppins font-bold text-sm text-slate-900 dark:text-white m-0">
                ¿Todo listo en tu estación de corte?
              </h3>
              <p className="font-inter text-xs text-slate-500 dark:text-slate-300 m-0">
                Pasa a la fase de cocción activa con los temporizadores sincronizados.
              </p>
            </section>
          </section>

          <button
            type="button"
            onClick={() => {
              notificar('Iniciando Modo Cocina con temporizadores activos...');
              if (onIniciarModoCocina) onIniciarModoCocina();
            }}
            className="receta-ing-btn-cobre px-6 py-2.5 rounded-full font-mono-tag text-xs font-bold uppercase tracking-wider flex items-center gap-2 self-start sm:self-center shrink-0 cursor-pointer shadow-md"
          >
            <i className="bi bi-play-circle-fill text-sm"></i>
            <span>INICIAR MODO COCINA</span>
          </button>
        </footer>
      </section>
    </article>
  );
}

export default RecetaIngredientesVista;