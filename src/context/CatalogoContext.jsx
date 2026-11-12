import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import initialProducts from '../data/initialProducts.json';

const STORAGE_KEY = 'sazon_catalogo';

const CatalogoContext = createContext(null);

// Estado inicial: lee de localStorage o carga el JSON por defecto
const cargarProductosIniciales = () => {
  try {
    const localData = localStorage.getItem(STORAGE_KEY);
    if (localData !== null) {
      const lista = JSON.parse(localData);
      if (Array.isArray(lista)) return lista;
    }
  } catch (error) {
    console.error('Error al leer de localStorage:', error);
  }
  return initialProducts;
};

export const CatalogoProvider = ({ children }) => {
  // Pasamos la función sin paréntesis para que solo se ejecute una vez
  const [productos, setProductos] = useState(cargarProductosIniciales);

  // Efecto reactivo: sincroniza cualquier cambio del array en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  }, [productos]);

  // Métodos de gestión
  const agregarProducto = (nuevoProducto) => {
    setProductos((prevProductos) => [...prevProductos, nuevoProducto]);
  };

  const actualizarProducto = (sku, productoEditado) => {
    setProductos((prevProductos) =>
      prevProductos.map((prod) =>
        prod.sku === sku ? { ...prod, ...productoEditado } : prod
      )
    );
  };

  const eliminarProducto = (sku) => {
    setProductos((prevProductos) =>
      prevProductos.filter((prod) => prod.sku !== sku)
    );
  };

  const obtenerProductoPorId = (id) => {
    return productos.find((prod) => String(prod.id) === String(id));
  };

  // Objeto con el estado y los métodos expuestos
  const value = {
    productos,
    agregarProducto,
    actualizarProducto,
    eliminarProducto,
    obtenerProductoPorId,
  };

  return (
    <CatalogoContext.Provider value={value}>
      {children}
    </CatalogoContext.Provider>
  );
};

CatalogoProvider.propTypes = {
  children: PropTypes.node,
};

// Custom Hook para consumir el contexto fácilmente
// eslint-disable-next-line react-refresh/only-export-components
export const useCatalogo = () => {
  const context = useContext(CatalogoContext);
  if (!context) {
    throw new Error('useCatalogo debe ser usado dentro de un CatalogoProvider');
  }
  return context;
};