import PropTypes from 'prop-types';

const optionShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  nombre: PropTypes.string.isRequired,
});

/**
 * Grupo de chips de selección única.
 * `selectedId === null` significa "Todas/Todos" (sin filtro).
 */
function ChipGroup({ label, allLabel, options, selectedId, onSelect }) {
  const base =
    'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7FBA00]';
  const active = 'border-[#215B33] bg-[#215B33] text-white';
  const idle =
    'border-[#643B22]/20 bg-white text-[#3F4040] hover:border-[#3D8E33] dark:border-white/20 dark:bg-transparent dark:text-[#F4F4E8] dark:hover:border-[#66d149]';

  return (
    <div role="group" aria-label={label} className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-[#643B22] dark:text-[#F4F4E8]">{label}</span>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={selectedId === null}
          onClick={() => onSelect(null)}
          className={`${base} ${selectedId === null ? active : idle}`}
        >
          {allLabel}
        </button>
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            aria-pressed={selectedId === opt.id}
            onClick={() => onSelect(selectedId === opt.id ? null : opt.id)}
            className={`${base} ${selectedId === opt.id ? active : idle}`}
          >
            {opt.nombre}
          </button>
        ))}
      </div>
    </div>
  );
}

ChipGroup.propTypes = {
  label: PropTypes.string.isRequired,
  allLabel: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(optionShape).isRequired,
  selectedId: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

/**
 * Barra de filtros totalmente controlada: el estado vive en CatalogoView.
 * Muestra qué filtros están activos (chips rellenos) y permite limpiarlos.
 */
export default function FilterBar({
  searchText,
  onSearchChange,
  marcas,
  categorias,
  marcaId,
  categoriaId,
  onMarcaChange,
  onCategoriaChange,
  onClear,
}) {
  const hasActiveFilters = searchText.trim() !== '' || marcaId !== null || categoriaId !== null;

  return (
    <section
      aria-label="Filtros del catálogo"
      className="flex flex-col gap-5 rounded-2xl border border-[#643B22]/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#133326] sm:p-5"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label htmlFor="catalogo-search" className="sr-only">
          Buscar producto por nombre
        </label>
        <div className="relative flex-1">
          <i
            className="bi bi-search pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5B5E60]"
            aria-hidden="true"
          />
          <input
            id="catalogo-search"
            type="search"
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar producto por nombre"
            className={`w-full rounded-full border py-2.5 pl-10 pr-4 text-sm text-[#3F4040] placeholder:text-[#5B5E60] focus:outline-none focus:ring-2 focus:ring-[#7FBA00] dark:bg-[#114622] dark:text-[#F4F4E8] dark:placeholder:text-[#F4F4E8]/60 ${
              searchText.trim() !== ''
                ? 'border-[#215B33] bg-[#F4F4E8] dark:border-[#66d149]'
                : 'border-[#643B22]/20 bg-white dark:border-white/20'
            }`}
          />
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="rounded-full px-4 py-2 text-sm font-semibold text-[#643B22] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7FBA00] dark:text-[#66d149]"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <ChipGroup
        label="Marca"
        allLabel="Todas"
        options={marcas}
        selectedId={marcaId}
        onSelect={onMarcaChange}
      />
      <ChipGroup
        label="Categoría"
        allLabel="Todas"
        options={categorias}
        selectedId={categoriaId}
        onSelect={onCategoriaChange}
      />
    </section>
  );
}

FilterBar.propTypes = {
  /** Texto actual del buscador (input controlado). */
  searchText: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  marcas: PropTypes.arrayOf(optionShape).isRequired,
  categorias: PropTypes.arrayOf(optionShape).isRequired,
  /** id de la marca seleccionada o null si no hay filtro. */
  marcaId: PropTypes.number,
  /** id de la categoría seleccionada o null si no hay filtro. */
  categoriaId: PropTypes.number,
  onMarcaChange: PropTypes.func.isRequired,
  onCategoriaChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

FilterBar.defaultProps = {
  marcaId: null,
  categoriaId: null,
};
