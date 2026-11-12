import { useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { CatalogoContext } from '../context/CatalogoContext';
import FilterBar from '../components/user/FilterBar';
import ProductCard from '../components/user/ProductCard';
import catalogoMockData from '../data/CatalogoMock';

/** Quita tildes y pasa a minúsculas para búsquedas tolerantes ("cafe" encuentra "Café"). */
const normalize = (text = '') =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

/** Estado vacío centrado, con acción para limpiar los filtros. */
function EmptyState({ onClear }) {
  return (
    <div
      role="status"
      className="flex min-h-[45vh] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#643B22]/25 px-6 py-12 text-center dark:border-white/20"
    >
      <i className="bi bi-search text-4xl text-[#3D8E33]" aria-hidden="true" />
      <h2 className="font-poppins text-xl font-semibold text-[#643B22] dark:text-[#F4F4E8]">
        No encontramos productos con esos filtros
      </h2>
      <p className="max-w-md text-sm text-[#5B5E60] dark:text-[#F4F4E8]/70">
        Revisa la ortografía o prueba con otra marca o categoría.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-2 rounded-full bg-[#3D8E33] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#215B33] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7FBA00] focus-visible:ring-offset-2"
      >
        Limpiar filtros
      </button>
    </div>
  );
}

EmptyState.propTypes = {
  onClear: PropTypes.func.isRequired,
};

/** Vista principal de la vitrina de catálogo (HU-04). */
export default function CatalogoView() {
  const ctx = useContext(CatalogoContext);
  const data = ctx ?? catalogoMockData;
  const { productos, marcas, categorias, presentaciones, imagenesProducto } = data;

  // Estado de los filtros (null = sin filtro)
  const [searchText, setSearchText] = useState('');
  const [marcaId, setMarcaId] = useState(null);
  const [categoriaId, setCategoriaId] = useState(null);

  /**
   * Une cada producto con su marca, categoría, presentación e imagen principal.
   * Solo se recalcula cuando cambian los datos del contexto.
   */
  const catalogo = useMemo(() => {
    const marcaPorId = new Map(marcas.map((m) => [m.id, m]));
    const categoriaPorId = new Map(categorias.map((c) => [c.id, c]));
    const presentacionPorProducto = new Map();
    presentaciones.forEach((p) => {
      if (!presentacionPorProducto.has(p.idProducto)) presentacionPorProducto.set(p.idProducto, p);
    });
    const imagenPorProducto = new Map();
    imagenesProducto
      .filter((img) => img.esPrincipal)
      .forEach((img) => imagenPorProducto.set(img.idProducto, img));

    return productos
      .filter((p) => p.activo)
      .map((p) => {
        const pres = presentacionPorProducto.get(p.id);
        const img = imagenPorProducto.get(p.id);
        return {
          id: p.id,
          nombre: p.nombre,
          idMarca: p.idMarca,
          idCategoria: p.idCategoria,
          marcaNombre: marcaPorId.get(p.idMarca)?.nombre ?? 'Sin marca',
          categoriaNombre: categoriaPorId.get(p.idCategoria)?.nombre ?? 'Sin categoría',
          presentacion: pres
            ? `${pres.descripcion} · ${pres.contenidoNeto} ${pres.unidadMedida}`
            : 'Presentación no disponible',
          precio: pres?.precio ?? p.precioReferencia,
          imagenUrl: img?.url,
          imagenAlt: img?.textoAlternativo,
        };
      });
  }, [productos, marcas, categorias, presentaciones, imagenesProducto]);

  /** Motor de filtros: texto + marca + categoría combinados (AND). */
  const productosFiltrados = useMemo(() => {
    const query = normalize(searchText);
    return catalogo.filter(
      (p) =>
        (query === '' || normalize(p.nombre).includes(query)) &&
        (marcaId === null || p.idMarca === marcaId) &&
        (categoriaId === null || p.idCategoria === categoriaId)
    );
  }, [catalogo, searchText, marcaId, categoriaId]);

  const clearFilters = useCallback(() => {
    setSearchText('');
    setMarcaId(null);
    setCategoriaId(null);
  }, []);

  const handleVerFicha = useCallback((producto) => {
    // Punto de enganche para la ficha de producto (otra HU).
    if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
      window.showToast(`Ficha de ${producto.nombre} próximamente`);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-poppins text-2xl font-bold text-[#643B22] dark:text-[#F4F4E8]">
          Catálogo de productos
        </h1>
        <p className="mt-1 text-sm text-[#5B5E60] dark:text-[#F4F4E8]/70" aria-live="polite">
          {productosFiltrados.length}{' '}
          {productosFiltrados.length === 1 ? 'producto' : 'productos'}
        </p>
      </header>

      <FilterBar
        searchText={searchText}
        onSearchChange={setSearchText}
        marcas={marcas}
        categorias={categorias}
        marcaId={marcaId}
        categoriaId={categoriaId}
        onMarcaChange={setMarcaId}
        onCategoriaChange={setCategoriaId}
        onClear={clearFilters}
      />

      {productosFiltrados.length === 0 ? (
        <EmptyState onClear={clearFilters} />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {productosFiltrados.map((producto) => (
            <ProductCard key={producto.id} producto={producto} onVerFicha={handleVerFicha} />
          ))}
        </div>
      )}
    </div>
  );
}
