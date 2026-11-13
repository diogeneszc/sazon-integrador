import { useEffect, useState } from 'react';
import { recetaServicio } from '../services/recetaServicio';
import '../styles/recetario.css';

function RecetaDetalleVista({ recetaId = 128, onLoadedMigas }) {
  const [receta, setReceta] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [recetaGuardada, setRecetaGuardada] = useState(false);
  const [enDespensa, setEnDespensa] = useState(false);


  useEffect(() => {
    let activo = true;

    const cargarReceta = async () => {
      try {
        const datos = await recetaServicio.buscarPorId(recetaId);
        if (activo) {
          setReceta(datos);
          setError(null);
          if (onLoadedMigas && datos.migas) {
            onLoadedMigas(datos.migas);
          }
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

    cargarReceta();

    return () => {
      activo = false;
    };
  }, [recetaId, onLoadedMigas]);

  const notificar = (mensaje) => {
    if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
      window.showToast(mensaje);
    }
  };

  if (cargando) {
    return (
      <section className="receta-detalle-container" aria-busy="true">
        <article className="receta-detalle-card p-10 text-center space-y-3">
          <i className="bi bi-arrow-repeat animate-spin text-3xl text-sazon-verdeHoja inline-block"></i>
          <p className="font-mono-tag text-xs text-slate-600 dark:text-slate-300 m-0">
            Cargando ficha gastronómica oficial...
          </p>
        </article>
      </section>
    );
  }

  if (error || !receta) {
    return (
      <section className="receta-detalle-container" role="alert">
        <article className="receta-detalle-card p-8 text-center space-y-3">
          <i className="bi bi-exclamation-triangle text-2xl text-red-600"></i>
          <h2 className="font-poppins font-bold text-lg m-0">No se pudo cargar la receta</h2>
          <p className="font-inter text-xs text-slate-500 m-0">{error}</p>
        </article>
      </section>
    );
  }

  return (
    <article className="receta-detalle-container">
      {/* 1. ENCABEZADO GENERAL DE LA RECETA */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <section className="space-y-3 max-w-3xl">
          <section className="flex flex-wrap items-center gap-3">
            <span className="receta-detalle-badge-categoria px-3 py-1 rounded-full font-mono-tag text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              <span>{receta.categoria}</span>
            </span>
            <span className="font-mono-tag text-xs text-slate-500 dark:text-slate-400">
              {receta.codigoInterno}
            </span>
          </section>

          <h1 className="font-poppins font-black text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight m-0">
            {receta.titulo}
          </h1>

          <p className="font-inter text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed m-0">
            {receta.resumen}
          </p>
        </section>

        {/* Tarjeta de Autoría Academia Nutresa */}
        <aside className="receta-detalle-card px-4 py-3.5 flex items-center gap-3.5 shrink-0 self-start lg:self-end">
          <span className="w-11 h-11 rounded-full bg-sazon-verdeHoja text-white flex items-center justify-center text-lg shadow-xs shrink-0">
            <i className="bi bi-award-fill"></i>
          </span>
          <section className="leading-tight pr-2">
            <p className="font-poppins font-bold text-xs text-slate-900 dark:text-white m-0 flex items-center gap-1.5">
              <span>{receta.autor.nombre}</span>
              {receta.autor.verificado && (
                <i
                  className="bi bi-patch-check-fill text-sazon-verdeHoja dark:text-sazon-verdeNeon"
                  title="Verificado"
                ></i>
              )}
            </p>
            <span className="font-inter text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
              {receta.autor.credencial}
            </span>
          </section>
        </aside>
      </header>

      {/* 2. BARRA DE METADATOS (TIEMPO, PORCIONES, DIFICULTAD, ENERGÍA) */}
      <section
        aria-label="Metadatos principales de la receta"
        className="receta-detalle-card p-4 sm:p-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        <article className="flex items-center gap-3.5">
          <span className="w-10 h-10 rounded-full bg-slate-100 dark:bg-sazon-verdeNutresa text-slate-600 dark:text-sazon-verdeNeon flex items-center justify-center text-base shrink-0">
            <i className="bi bi-clock"></i>
          </span>
          <section>
            <span className="font-mono-tag text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-400 block">
              TIEMPO TOTAL
            </span>
            <strong className="font-poppins font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              {receta.metadatos.tiempoTotal}
            </strong>
          </section>
        </article>

        <article className="flex items-center gap-3.5 border-l border-slate-200/70 dark:border-white/10 pl-4">
          <span className="w-10 h-10 rounded-full bg-amber-50 dark:bg-sazon-verdeNutresa text-amber-700 dark:text-amber-300 flex items-center justify-center text-base shrink-0">
            <i className="bi bi-people"></i>
          </span>
          <section>
            <span className="font-mono-tag text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-400 block">
              PORCIONES
            </span>
            <strong className="font-poppins font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              {receta.metadatos.porcionesTexto}
            </strong>
          </section>
        </article>

        <article className="flex items-center gap-3.5 lg:border-l border-slate-200/70 dark:border-white/10 lg:pl-4">
          <span className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-sazon-verdeNutresa text-sazon-verdeHoja dark:text-sazon-verdeNeon flex items-center justify-center text-base shrink-0">
            <i className="bi bi-speedometer2"></i>
          </span>
          <section>
            <span className="font-mono-tag text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-400 block">
              DIFICULTAD
            </span>
            <strong className="font-poppins font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              {receta.metadatos.dificultad}
            </strong>
          </section>
        </article>

        <article className="flex items-center gap-3.5 border-l border-slate-200/70 dark:border-white/10 pl-4">
          <span className="w-10 h-10 rounded-full bg-orange-50 dark:bg-sazon-verdeNutresa text-orange-600 dark:text-orange-400 flex items-center justify-center text-base shrink-0">
            <i className="bi bi-fire"></i>
          </span>
          <section>
            <span className="font-mono-tag text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-400 block">
              ENERGÍA
            </span>
            <p className="m-0">
              <strong className="font-poppins font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                {receta.metadatos.energiaPorPorcion}
              </strong>{' '}
              <span className="font-mono-tag text-[11px] text-slate-400">
                {receta.metadatos.unidadEnergia}
              </span>
            </p>
          </section>
        </article>
      </section>

      {/* 3. CONTENEDOR MULTIMEDIA PRINCIPAL Y BARRA DE ACCIONES */}
      <section className="receta-detalle-card overflow-hidden">
        <figure className="receta-detalle-hero-figure">
          <img
            src={receta.multimedia.imagenPrincipal}
            alt={receta.titulo}
            className="receta-detalle-hero-img"
          />
          <section className="receta-detalle-hero-overlay"></section>

          {/* Etiquetas Superiores */}
          <header className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 z-10">
            <section className="flex flex-wrap items-center gap-2">
              {receta.multimedia.etiquetasSuperiores.map((tag) => (
                <span
                  key={tag.texto}
                  className={
                    tag.tipo === 'destacada'
                      ? 'bg-white/95 text-sazon-verdeNoche px-3 py-1.5 rounded-full font-mono-tag text-[11px] font-bold flex items-center gap-1.5 shadow-md'
                      : 'bg-orange-600 text-white px-3 py-1.5 rounded-full font-mono-tag text-[11px] font-bold flex items-center gap-1.5 shadow-md'
                  }
                >
                  <i className={`bi ${tag.icono}`}></i>
                  <span>{tag.texto}</span>
                </span>
              ))}
            </section>

            <span className="bg-black/65 backdrop-blur-md text-white px-3 py-1.5 rounded-full font-mono-tag text-[11px] flex items-center gap-1.5 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-sazon-verdeNeon"></span>
              <span>{receta.multimedia.calidadVideo}</span>
            </span>
          </header>

          {/* Pie de Imagen: Técnica Clave + Comunidad */}
          <figcaption className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10 text-white">
            <section className="space-y-1 max-w-xl">
              <span className="font-mono-tag text-[11px] uppercase tracking-wider text-sazon-verdeNeon font-bold flex items-center gap-1.5">
                <i className="bi bi-check-circle-fill"></i>
                <span>{receta.multimedia.tecnicaClave.etiqueta}</span>
              </span>
              <h2 className="font-poppins font-bold text-lg sm:text-2xl text-white leading-snug m-0">
                {receta.multimedia.tecnicaClave.descripcion}
              </h2>
            </section>

            <aside className="bg-black/65 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/15 flex items-center gap-2.5 self-start sm:self-end">
              <section className="flex -space-x-1.5">
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-mono-tag text-[10px] font-bold flex items-center justify-center ring-1 ring-white">
                  {receta.multimedia.comunidadActiva.sellos[0]}
                </span>
                <span className="w-6 h-6 rounded-full bg-orange-600 text-white font-mono-tag text-[10px] font-bold flex items-center justify-center ring-1 ring-white">
                  {receta.multimedia.comunidadActiva.sellos[1]}
                </span>
                <span className="w-6 h-6 rounded-full bg-amber-800 text-white font-mono-tag text-[10px] font-bold flex items-center justify-center ring-1 ring-white">
                  {receta.multimedia.comunidadActiva.sellos[2]}
                </span>
              </section>
              <span className="font-inter text-xs text-white/95 pr-1">
                {receta.multimedia.comunidadActiva.texto}
              </span>
            </aside>
          </figcaption>
        </figure>

        {/* Barra Inferior de Acciones del Plato */}
        <footer className="p-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-sazon-verdeNutresaCard">
          <nav aria-label="Acciones secundarias de receta" className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                setRecetaGuardada((prev) => !prev);
                notificar(
                  !recetaGuardada
                    ? 'Receta guardada en tu colección personal'
                    : 'Receta removida de guardados'
                );
              }}
              className={
                recetaGuardada
                  ? 'px-4 py-2 rounded-full bg-sazon-verdeHoja text-white font-mono-tag text-xs font-bold flex items-center gap-2 cursor-pointer transition-all'
                  : 'px-4 py-2 rounded-full bg-slate-100 dark:bg-sazon-verdeNutresa text-slate-700 dark:text-slate-200 hover:bg-slate-200 font-mono-tag text-xs font-bold flex items-center gap-2 cursor-pointer transition-all'
              }
            >
              <i className={`bi ${recetaGuardada ? 'bi-bookmark-check-fill' : 'bi-bookmark'}`}></i>
              <span>{recetaGuardada ? 'RECETA GUARDADA' : 'GUARDAR RECETA'}</span>
            </button>

            <button
              type="button"
              onClick={() => notificar('Enlace copiado: sazon.app/recetas/' + receta.id)}
              className="px-4 py-2 rounded-full bg-slate-100 dark:bg-sazon-verdeNutresa text-slate-700 dark:text-slate-200 hover:bg-slate-200 font-mono-tag text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
            >
              <i className="bi bi-share"></i>
              <span>COMPARTIR</span>
            </button>

            <button
              type="button"
              onClick={() => notificar('Generando ficha técnica imprimible...')}
              className="px-4 py-2 rounded-full bg-slate-100 dark:bg-sazon-verdeNutresa text-slate-700 dark:text-slate-200 hover:bg-slate-200 font-mono-tag text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
            >
              <i className="bi bi-printer"></i>
              <span>IMPRIMIR FICHA</span>
            </button>
          </nav>

          <button
            type="button"
            onClick={() => notificar('Iniciando Modo Cocina paso a paso...')}
            className="receta-detalle-btn-primary px-6 py-2.5 rounded-full font-mono-tag text-xs font-bold flex items-center gap-2.5 shadow-md cursor-pointer"
          >
            <i className="bi bi-play-circle-fill text-base"></i>
            <span>INICIAR MODO COCINA</span>
          </button>
        </footer>
      </section>

      {/* 4. SECCIÓN INFERIOR: BALANCE NUTRICIONAL + INGREDIENTES CLAVE DE LA DESPENSA */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 4.1 Tarjeta de Balance Nutricional Básico Asociado */}
        <section
          aria-labelledby="titulo-balance-nutricional"
          className="receta-detalle-card p-6 lg:col-span-4 flex flex-col justify-between space-y-5"
        >
          <section className="space-y-4">
            <header className="flex items-center justify-between gap-2">
              <section className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-sazon-verdeHoja text-white flex items-center justify-center text-xs">
                  <i className="bi bi-lightning-charge-fill"></i>
                </span>
                <h3
                  id="titulo-balance-nutricional"
                  className="font-poppins font-bold text-base text-slate-900 dark:text-white m-0"
                >
                  Balance Nutricional
                </h3>
              </section>
              <span className="font-mono-tag text-[10px] uppercase tracking-wider text-slate-400">
                {receta.nutricion.porcionReferencia}
              </span>
            </header>

            <p className="font-inter text-xs text-slate-600 dark:text-slate-300 leading-relaxed m-0">
              {receta.nutricion.descripcion}
            </p>

            {/* Gráfico de Dona SVG y Desglose de Macronutrientes */}
            <section className="receta-detalle-subcard p-4 flex items-center justify-around gap-4">
              <figure className="relative flex items-center justify-center m-0">
                <svg className="receta-detalle-donut-svg" viewBox="0 0 100 100">
                  <circle className="receta-detalle-donut-bg" cx="50" cy="50" r="40" />
                  <circle className="receta-detalle-donut-carbos" cx="50" cy="50" r="40" />
                  <circle className="receta-detalle-donut-proteina" cx="50" cy="50" r="40" />
                  <circle className="receta-detalle-donut-grasas" cx="50" cy="50" r="40" />
                </svg>
                <figcaption className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <strong className="font-poppins font-extrabold text-sm text-slate-900 dark:text-white leading-none">
                    {receta.nutricion.calorias}
                  </strong>
                  <span className="font-mono-tag text-[10px] text-slate-500 dark:text-slate-400 uppercase">
                    KCAL
                  </span>
                </figcaption>
              </figure>

              <ul className="space-y-2 list-none m-0 p-0">
                {receta.nutricion.macros.map((macro) => (
                  <li key={macro.nombre} className="flex items-center gap-2 text-xs">
                    <span className={`w-2.5 h-2.5 rounded-full ${macro.claseColor}`}></span>
                    <span className="font-inter text-slate-600 dark:text-slate-300">
                      {macro.nombre}:
                    </span>
                    <strong className="font-poppins font-bold text-slate-900 dark:text-white">
                      {macro.cantidad}
                    </strong>
                  </li>
                ))}
              </ul>
            </section>
          </section>

          <footer className="px-3.5 py-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/50 border border-emerald-200/70 dark:border-emerald-800/50 flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-sazon-verdeHondo dark:text-sazon-verdeNeon font-medium">
              <i className="bi bi-shield-check"></i>
              <span>{receta.nutricion.avalTexto}</span>
            </span>
            <strong className="font-mono-tag text-[11px] text-sazon-verdeHoja dark:text-sazon-verdeNeon uppercase">
              {receta.nutricion.avalEstado}
            </strong>
          </footer>
        </section>

        {/* 4.2 Tarjeta de Ingredientes Clave de la Despensa */}
        <section
          aria-labelledby="titulo-ingredientes-clave"
          className="receta-detalle-card p-6 lg:col-span-8 flex flex-col justify-between space-y-5"
        >
          <section className="space-y-4">
            <header className="flex flex-wrap items-center justify-between gap-2">
              <section className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs">
                  <i className="bi bi-basket2-fill"></i>
                </span>
                <h3
                  id="titulo-ingredientes-clave"
                  className="font-poppins font-bold text-base text-slate-900 dark:text-white m-0"
                >
                  Ingredientes Clave de la Despensa
                </h3>
              </section>
              <span className="font-mono-tag text-[10px] uppercase tracking-wider text-slate-400">
                {receta.ingredientesClaveDespensa.selloDerecho}
              </span>
            </header>

            <p className="font-inter text-xs text-slate-600 dark:text-slate-300 leading-relaxed m-0">
              {receta.ingredientesClaveDespensa.descripcion}
            </p>

            {/* Tarjetas de las 3 Marcas Principales */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {receta.ingredientesClaveDespensa.destacados.map((item) => (
                <article
                  key={item.id}
                  className="receta-detalle-subcard p-4 flex flex-col justify-between space-y-3"
                >
                  <section className="space-y-2.5">
                    <header className="flex items-center justify-between gap-1">
                      <span
                        className={`${item.claseMarca} px-2.5 py-0.5 rounded-full font-mono-tag text-[10px] font-bold uppercase`}
                      >
                        {item.marca}
                      </span>
                      <i className="bi bi-check-circle-fill text-slate-300 dark:text-emerald-500 text-sm"></i>
                    </header>

                    <h4 className="font-poppins font-bold text-sm text-slate-900 dark:text-white leading-snug m-0">
                      {item.nombre}
                    </h4>

                    <p className="font-inter text-xs text-slate-500 dark:text-slate-300 m-0">
                      {item.cantidadDetalle}
                    </p>
                  </section>

                  <footer className="pt-2 border-t border-slate-200/70 dark:border-white/10">
                    <span className="font-mono-tag text-[10px] text-slate-400 block">
                      {item.notaCalidad}
                    </span>
                  </footer>
                </article>
              ))}
            </section>
          </section>

          {/* Barra Inferior de Adición Rápida a Despensa */}
          <footer className="receta-detalle-subcard p-3.5 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <section className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-sazon-verdeHoja text-white flex items-center justify-center text-sm shrink-0">
                <i className="bi bi-cart-check-fill"></i>
              </span>
              <section>
                <h4 className="font-poppins font-bold text-xs text-slate-900 dark:text-white m-0">
                  ¿Te faltan ingredientes en tu cocina?
                </h4>
                <p className="font-inter text-[11px] text-slate-500 dark:text-slate-300 m-0">
                  Agrega todos los insumos Nutresa a tu lista de compras con un clic.
                </p>
              </section>
            </section>

            <button
              type="button"
              onClick={() => {
                setEnDespensa(true);
                notificar('Insumos Nutresa añadidos a tu Despensa Virtual');
              }}
              className="px-4 py-2 rounded-full bg-white dark:bg-sazon-verdeNutresaCard border border-slate-300 dark:border-emerald-700 text-slate-800 dark:text-white hover:border-sazon-verdeHoja font-mono-tag text-[11px] font-bold flex items-center gap-2 self-start sm:self-center shrink-0 cursor-pointer transition-all shadow-2xs"
            >
              <i
                className={`bi ${
                  enDespensa ? 'bi-check-circle-fill text-sazon-verdeHoja' : 'bi-plus-circle-fill text-sazon-verdeHoja'
                }`}
              ></i>
              <span>{enDespensa ? 'AÑADIDO A LA DESPENSA' : 'AÑADIR TODO A LA DESPENSA'}</span>
            </button>
          </footer>
        </section>
      </section>
    </article>
  );
}

export default RecetaDetalleVista;