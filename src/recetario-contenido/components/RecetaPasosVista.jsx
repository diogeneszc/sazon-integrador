import { useEffect, useState } from 'react';
import { recetaServicio } from '../services/recetaServicio';
import '../styles/recetario.css';

function formatearSegundosAMinutos(segundosTotales) {
  const seg = Math.max(0, Number(segundosTotales) || 0);
  const minutos = Math.floor(seg / 60);
  const segundos = seg % 60;
  return `${minutos}:${segundos < 10 ? '0' : ''}${segundos} MIN`;
}

function RecetaPasosVista({ recetaId = 128, onVerValorNutricional }) {
  const [datosPreparacion, setDatosPreparacion] = useState(null);
  const [pasosHechos, setPasosHechos] = useState({});
  const [tiemposRestantes, setTiemposRestantes] = useState({});
  const [temporizadoresActivos, setTemporizadoresActivos] = useState({});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;

    const cargarPasos = async () => {
      try {
        const respuesta = await recetaServicio.obtenerPasosDeReceta(recetaId);
        if (activo) {
          setDatosPreparacion(respuesta);
          const mapaTiempos = {};
          respuesta.pasos.forEach((p) => {
            if (p.duracionSegundos > 0) {
              mapaTiempos[p.orden] = p.duracionSegundos;
            }
          });
          setTiemposRestantes(mapaTiempos);
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

    cargarPasos();

    return () => {
      activo = false;
    };
  }, [recetaId]);

  const notificar = (mensaje) => {
    if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
      window.showToast(mensaje);
    }
  };

  useEffect(() => {
    const ordenesActivos = Object.keys(temporizadoresActivos).filter(
      (orden) => temporizadoresActivos[orden]
    );
    if (ordenesActivos.length === 0) return undefined;

    const timer = setInterval(() => {
      setTiemposRestantes((prev) => {
        const copia = { ...prev };
        ordenesActivos.forEach((orden) => {
          if (copia[orden] > 1) {
            copia[orden] -= 1;
          } else if (copia[orden] === 1) {
            copia[orden] = 0;
            setTemporizadoresActivos((act) => ({ ...act, [orden]: false }));
            setPasosHechos((hechos) => ({ ...hechos, [orden]: true }));
            notificar(`¡Tiempo completado en el Paso 0${orden}!`);
          }
        });
        return copia;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [temporizadoresActivos]);

  const alternarTemporizador = (paso) => {
    const orden = paso.orden;
    const estaActivo = Boolean(temporizadoresActivos[orden]);

    if (!estaActivo && tiemposRestantes[orden] === 0) {
      setTiemposRestantes((prev) => ({ ...prev, [orden]: paso.duracionSegundos }));
    }

    setTemporizadoresActivos((prev) => {
      const nuevoEstado = !prev[orden];
      notificar(
        nuevoEstado
          ? `Temporizador iniciado para ${paso.titulo}`
          : `Temporizador en pausa (${paso.titulo})`
      );
      return { ...prev, [orden]: nuevoEstado };
    });
  };

  const alternarPasoHecho = (paso) => {
    const orden = paso.orden;
    setPasosHechos((prev) => {
      const nuevo = !prev[orden];
      if (nuevo) {
        setTemporizadoresActivos((act) => ({ ...act, [orden]: false }));
        notificar(`Paso ${paso.codigoVisual} marcado como hecho`);
      } else {
        notificar(`Paso ${paso.codigoVisual} desmarcado`);
      }
      return { ...prev, [orden]: nuevo };
    });
  };

  const completarTodaLaReceta = () => {
    if (!datosPreparacion) return;
    const todos = {};
    datosPreparacion.pasos.forEach((p) => {
      todos[p.orden] = true;
    });
    setTemporizadoresActivos({});
    setPasosHechos(todos);
    notificar('¡Felicitaciones! Receta completada y registrada en Academia Sa·zón Nutresa');
  };

  if (cargando) {
    return (
      <section className="receta-detalle-container" aria-busy="true">
        <article className="receta-detalle-card p-10 text-center space-y-3">
          <i className="bi bi-arrow-repeat animate-spin text-3xl text-sazon-verdeHoja inline-block"></i>
          <p className="font-mono-tag text-xs text-slate-600 dark:text-slate-300 m-0">
            Cargando secuencia culinaria paso a paso...
          </p>
        </article>
      </section>
    );
  }

  if (error || !datosPreparacion) {
    return (
      <section className="receta-detalle-container" role="alert">
        <article className="receta-detalle-card p-8 text-center space-y-3">
          <i className="bi bi-exclamation-triangle text-2xl text-red-600"></i>
          <h2 className="font-poppins font-bold text-lg m-0">No se pudieron cargar los pasos</h2>
          <p className="font-inter text-xs text-slate-500 m-0">{error}</p>
        </article>
      </section>
    );
  }

  const totalPasos = datosPreparacion.pasos.length;
  const totalCompletados = datosPreparacion.pasos.filter((p) => pasosHechos[p.orden]).length;
  const ref = datosPreparacion.presentacionReferencia;

  return (
    <article className="receta-detalle-container">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200/80 dark:border-white/10 pb-6">
        <section className="space-y-3 max-w-2xl">
          <section className="flex flex-wrap items-center gap-2.5">
            <span className="bg-emerald-200/90 dark:bg-emerald-950 text-sazon-verdeNoche dark:text-sazon-verdeNeon px-3 py-1 rounded-full font-mono-tag text-[10px] font-bold uppercase tracking-wider">
              {datosPreparacion.etiquetaTecnica}
            </span>
            <span className="font-mono-tag text-xs font-bold text-amber-800 dark:text-amber-300">
              • {datosPreparacion.marcasSubtitulo}
            </span>
          </section>

          <h1 className="font-poppins font-black text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight m-0">
            {datosPreparacion.tituloSeccion}
          </h1>

          <p className="font-inter text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed m-0">
            {datosPreparacion.descripcionSeccion}
          </p>
        </section>

        <aside className="receta-detalle-card px-5 py-3.5 flex items-center gap-3.5 self-start lg:self-end shrink-0">
          <span className="w-11 h-11 rounded-full bg-sazon-verdeHoja text-white flex items-center justify-center text-lg shadow-xs shrink-0">
            <i className="bi bi-stopwatch-fill"></i>
          </span>
          <section className="leading-tight">
            <span className="font-mono-tag text-[10px] uppercase tracking-wider text-slate-400 block">
              TIEMPO ACTIVO TOTAL
            </span>
            <strong className="font-poppins font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
              {datosPreparacion.tiempoActivoTotal}
            </strong>
          </section>
        </aside>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        <section aria-label="Secuencia de pasos de preparación" className="lg:col-span-8">
          <ol className="receta-pasos-lista">
            {datosPreparacion.pasos.map((paso) => {
              const completado = Boolean(pasosHechos[paso.orden]);
              const timerCorriendo = Boolean(temporizadoresActivos[paso.orden]);
              const segundosActuales =
                tiemposRestantes[paso.orden] !== undefined
                  ? tiemposRestantes[paso.orden]
                  : paso.duracionSegundos;

              return (
                <li
                  key={paso.orden}
                  className={
                    completado
                      ? 'receta-paso-item receta-paso-item-completado'
                      : 'receta-paso-item'
                  }
                >
                  <article className="flex flex-col sm:flex-row items-start gap-4">
                    <span
                      className={`w-11 h-11 rounded-full font-mono-tag text-sm font-bold flex items-center justify-center shrink-0 shadow-xs ${paso.claseColorNumero}`}
                    >
                      {completado ? <i className="bi bi-check-lg text-base"></i> : paso.codigoVisual}
                    </span>

                    <section className="flex-1 w-full space-y-3.5">
                      <header className="flex flex-wrap items-center justify-between gap-2">
                        <h2 className="font-poppins font-extrabold text-base sm:text-lg text-slate-900 dark:text-white m-0">
                          {paso.titulo}
                        </h2>
                        <span className="receta-paso-tag-tecnico px-3 py-1 rounded-full font-mono-tag text-[11px] font-semibold">
                          {paso.parametroTecnico}
                        </span>
                      </header>

                      <p className="font-inter text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed m-0">
                        {paso.descripcion}
                      </p>

                      <nav
                        aria-label={`Controles del ${paso.titulo}`}
                        className="flex flex-wrap items-center gap-2.5 pt-1"
                      >
                        {paso.duracionSegundos > 0 && (
                          <button
                            type="button"
                            onClick={() => alternarTemporizador(paso)}
                            className={
                              timerCorriendo
                                ? 'receta-paso-btn-timer-activo px-4 py-2 rounded-full font-mono-tag text-[11px] font-bold uppercase flex items-center gap-2 cursor-pointer shadow-xs'
                                : 'receta-paso-btn-timer px-4 py-2 rounded-full font-mono-tag text-[11px] font-bold uppercase flex items-center gap-2 cursor-pointer'
                            }
                          >
                            <i
                              className={`bi ${
                                timerCorriendo ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'
                              } text-sm`}
                            ></i>
                            <span>
                              {timerCorriendo ? 'PAUSAR TEMPORIZADOR' : 'INICIAR TEMPORIZADOR'}{' '}
                              <strong>{formatearSegundosAMinutos(segundosActuales)}</strong>
                            </span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => alternarPasoHecho(paso)}
                          className={
                            completado
                              ? 'px-4 py-2 rounded-full bg-sazon-verdeHoja text-white font-mono-tag text-[11px] font-bold uppercase flex items-center gap-1.5 cursor-pointer shadow-xs'
                              : 'px-4 py-2 rounded-full bg-slate-100 dark:bg-sazon-verdeNutresa text-slate-700 dark:text-slate-200 hover:bg-slate-200 font-mono-tag text-[11px] font-bold uppercase flex items-center gap-1.5 cursor-pointer transition-colors'
                          }
                        >
                          <i className={`bi ${completado ? 'bi-check-circle-fill' : 'bi-check2'}`}></i>
                          <span>{completado ? 'PASO COMPLETADO' : 'MARCAR HECHO'}</span>
                        </button>
                      </nav>

                      {paso.consejoChef && (
                        <aside className="receta-paso-consejo-box p-3.5 flex items-start gap-3">
                          <span className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-950/70 text-orange-700 dark:text-orange-300 flex items-center justify-center text-xs shrink-0 mt-0.5">
                            <i className={`bi ${paso.consejoChef.icono}`}></i>
                          </span>
                          <p className="font-inter text-xs text-slate-600 dark:text-slate-300 leading-relaxed m-0">
                            <strong className="font-poppins font-bold text-amber-900 dark:text-amber-300 block mb-0.5">
                              {paso.consejoChef.titulo}
                            </strong>
                            {paso.consejoChef.texto}
                          </p>
                        </aside>
                      )}
                    </section>
                  </article>
                </li>
              );
            })}
          </ol>
        </section>

        <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-20">
          <figure className="receta-detalle-card overflow-hidden m-0">
            <section className="receta-paso-ref-img-wrap">
              <img
                src={ref.imagen}
                alt={ref.tituloPlato}
                className="receta-detalle-hero-img"
              />
              <span className="absolute top-3 left-3 bg-white/95 text-slate-900 px-3 py-1 rounded-full font-mono-tag text-[10px] font-bold flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-sazon-verdeHoja"></span>
                <span>{ref.sello}</span>
              </span>
            </section>

            <figcaption className="p-5 space-y-2">
              <header className="flex items-center justify-between gap-2">
                <h3 className="font-poppins font-extrabold text-base text-slate-900 dark:text-white m-0">
                  {ref.tituloPlato}
                </h3>
                <span className="font-mono-tag text-[11px] font-bold text-amber-800 dark:text-amber-300">
                  {ref.porciones}
                </span>
              </header>
              <p className="font-inter text-xs text-slate-500 dark:text-slate-300 leading-relaxed m-0">
                {ref.descripcion}
              </p>
            </figcaption>
          </figure>

          <section className="receta-detalle-card p-5 space-y-4">
            <header className="flex items-center justify-between">
              <section className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-sazon-verdeHoja text-white flex items-center justify-center text-xs">
                  <i className="bi bi-broadcast"></i>
                </span>
                <h3 className="font-poppins font-bold text-sm text-slate-900 dark:text-white m-0">
                  Progreso en Estación
                </h3>
              </section>
              <output className="font-mono-tag text-xs font-bold text-sazon-verdeHoja dark:text-sazon-verdeNeon">
                {totalCompletados} / {totalPasos}
              </output>
            </header>

            <section className="grid grid-cols-5 gap-1.5" aria-hidden="true">
              {datosPreparacion.pasos.map((p) => (
                <span
                  key={p.orden}
                  className={
                    pasosHechos[p.orden]
                      ? 'receta-paso-segmento-activo'
                      : 'receta-paso-segmento'
                  }
                ></span>
              ))}
            </section>

            <section className="grid grid-cols-3 gap-2 text-center">
              <article className="receta-detalle-subcard p-2.5 space-y-0.5">
                <i className="bi bi-speedometer2 text-slate-400 text-xs block"></i>
                <span className="font-mono-tag text-[9px] uppercase text-slate-400 block">
                  Dificultad
                </span>
                <strong className="font-poppins font-bold text-xs text-slate-800 dark:text-white block">
                  {ref.indicadoresEstacion.dificultad}
                </strong>
              </article>

              <article className="receta-detalle-subcard p-2.5 space-y-0.5">
                <i className="bi bi-thermometer-high text-slate-400 text-xs block"></i>
                <span className="font-mono-tag text-[9px] uppercase text-slate-400 block">
                  Temperatura
                </span>
                <strong className="font-poppins font-bold text-xs text-slate-800 dark:text-white block">
                  {ref.indicadoresEstacion.temperatura}
                </strong>
              </article>

              <article className="receta-detalle-subcard p-2.5 space-y-0.5">
                <i className="bi bi-disc text-slate-400 text-xs block"></i>
                <span className="font-mono-tag text-[9px] uppercase text-slate-400 block">
                  Técnica
                </span>
                <strong className="font-poppins font-bold text-xs text-slate-800 dark:text-white block">
                  {ref.indicadoresEstacion.tecnica}
                </strong>
              </article>
            </section>

            <button
              type="button"
              onClick={() => {
                if (onVerValorNutricional) onVerValorNutricional();
              }}
              className="receta-detalle-subcard w-full p-3 flex items-center justify-between text-left cursor-pointer"
            >
              <section className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-emerald-200 dark:bg-emerald-950 text-sazon-verdeNoche dark:text-sazon-verdeNeon flex items-center justify-center text-xs shrink-0">
                  <i className="bi bi-heart-pulse-fill"></i>
                </span>
                <section>
                  <strong className="font-poppins font-bold text-xs text-slate-900 dark:text-white block">
                    {ref.resumenNutricional.caloriasTexto}
                  </strong>
                  <span className="font-inter text-[11px] text-slate-500 dark:text-slate-300 block">
                    {ref.resumenNutricional.macrosTexto}
                  </span>
                </section>
              </section>
              <i className="bi bi-chevron-right text-xs text-slate-400"></i>
            </button>
          </section>

          <aside className="receta-paso-pausa-card p-4 flex items-start gap-3 shadow-md">
            <i className="bi bi-info-circle text-base text-amber-200 shrink-0 mt-0.5"></i>
            <section className="space-y-1">
              <h4 className="font-poppins font-bold text-xs text-white m-0">
                {ref.notaPausa.titulo}
              </h4>
              <p className="font-inter text-[11px] text-white/90 leading-relaxed m-0">
                {ref.notaPausa.descripcion}
              </p>
            </section>
          </aside>
        </aside>
      </section>

      <footer className="receta-detalle-card p-5 sm:px-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <section className="flex items-center gap-3.5">
          <span className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 text-sazon-verdeHoja dark:text-sazon-verdeNeon flex items-center justify-center text-base shrink-0">
            <i className="bi bi-award-fill"></i>
          </span>
          <section>
            <h3 className="font-poppins font-extrabold text-sm sm:text-base text-slate-900 dark:text-white m-0">
              Evaluación de Módulo
            </h3>
            <p className="font-inter text-xs text-slate-500 dark:text-slate-300 m-0">
              Registra tu cocción para sumar puntos al Certificado Sazón Nutresa.
            </p>
          </section>
        </section>

        <nav className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              notificar('Consultando ficha de Balance Nutricional...');
              if (onVerValorNutricional) onVerValorNutricional();
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-sazon-verdeNutresa text-amber-900 dark:text-amber-300 hover:bg-slate-200 font-mono-tag text-xs font-bold uppercase flex items-center gap-2 cursor-pointer transition-colors"
          >
            <i className="bi bi-bar-chart-line-fill"></i>
            <span>VER VALOR NUTRICIONAL</span>
          </button>

          <button
            type="button"
            onClick={completarTodaLaReceta}
            className="receta-detalle-btn-primary px-5 py-2.5 rounded-xl font-mono-tag text-xs font-bold uppercase flex items-center gap-2 cursor-pointer shadow-md"
          >
            <i className="bi bi-check-circle-fill text-sazon-verdeNeon"></i>
            <span>RECETA COMPLETADA</span>
          </button>
        </nav>
      </footer>
    </article>
  );
}

export default RecetaPasosVista;
