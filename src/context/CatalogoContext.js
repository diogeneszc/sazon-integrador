import { createContext } from 'react';

/**
 * Contexto global del catálogo.
 * Forma esperada del valor: { productos, marcas, categorias, presentaciones, imagenesProducto }
 * (la misma estructura de src/data/catalogoMock.js).
 *
 * Si no hay un Provider, CatalogoView usa catalogoMock.js como respaldo.
 */
export const CatalogoContext = createContext(null);