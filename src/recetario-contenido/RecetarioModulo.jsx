import { useState } from 'react';
import RecetaDetalleVista from './components/RecetaDetalleVista';
import RecetaIngredientesVista from './components/RecetaIngredientesVista';
import RecetaPasosVista from './components/RecetaPasosVista';
import './styles/recetario.css';

function RecetarioModulo({ recetaId = 128 }) {

  const [vistaActiva, setVistaActiva] = useState('detalle');

  const irASeccion = (nuevaVista) => {
    setVistaActiva(nuevaVista);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="space-y-8">
      {/* Navegación interna del módulo Recetario y Contenido */}
      <nav
        aria-label="Secciones de la receta"
        className="receta-detalle-card p-2 flex flex-wrap items-center justify-between gap-2"
      >
        <section className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => irASeccion('detalle')}
            className={
              vistaActiva === 'detalle'
                ? 'px-4 py-2 rounded-xl bg-sazon-verdeHoja text-white font-poppins text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs'
                : 'px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-sazon-verdeNutresa font-poppins text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors'
            }
          >
            <i className="bi bi-journal-richtext"></i>
            <span>1. Ficha y Nutrición</span>
          </button>

          <button
            type="button"
            onClick={() => irASeccion('ingredientes')}
            className={
              vistaActiva === 'ingredientes'
                ? 'px-4 py-2 rounded-xl bg-sazon-verdeHoja text-white font-poppins text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs'
                : 'px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-sazon-verdeNutresa font-poppins text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors'
            }
          >
            <i className="bi bi-basket2-fill"></i>
            <span>2. Ingredientes Nutresa</span>
          </button>

          <button
            type="button"
            onClick={() => irASeccion('pasos')}
            className={
              vistaActiva === 'pasos'
                ? 'px-4 py-2 rounded-xl bg-sazon-verdeHoja text-white font-poppins text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs'
                : 'px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-sazon-verdeNutresa font-poppins text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors'
            }
          >
            <i className="bi bi-list-ol"></i>
            <span>3. Paso a Paso Culinario</span>
          </button>
        </section>

        <button
          type="button"
          onClick={() => irASeccion('completa')}
          className={
            vistaActiva === 'completa'
              ? 'px-3.5 py-2 rounded-xl bg-sazon-verdeNutresa text-white font-mono-tag text-[11px] font-bold flex items-center gap-1.5 cursor-pointer'
              : 'px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-sazon-verdeNutresa text-slate-700 dark:text-slate-200 font-mono-tag text-[11px] font-bold flex items-center gap-1.5 cursor-pointer'
          }
        >
          <i className="bi bi-arrows-fullscreen"></i>
          <span>Ver Todo Integrado</span>
        </button>
      </nav>

      {/* Renderizado de tus 3 Historias de Usuario */}
      {(vistaActiva === 'detalle' || vistaActiva === 'completa') && (
        <RecetaDetalleVista recetaId={recetaId} />
      )}

      {(vistaActiva === 'ingredientes' || vistaActiva === 'completa') && (
        <RecetaIngredientesVista
          recetaId={recetaId}
          onIniciarModoCocina={() => irASeccion('pasos')}
        />
      )}

      {(vistaActiva === 'pasos' || vistaActiva === 'completa') && (
        <RecetaPasosVista
          recetaId={recetaId}
          onVerValorNutricional={() => irASeccion('detalle')}
        />
      )}
    </section>
  );
}

export default RecetarioModulo;