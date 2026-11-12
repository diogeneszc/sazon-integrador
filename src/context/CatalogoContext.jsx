import { createContext, useContext, useState, useEffect } from 'react';
import initialProducts from '../data/initialProducts.json';

const CatalogoContext = createContext();

// eslint-disable-next-line react/prop-types
export const CatalogoProvider = ({ children }) => {
  // Estado inicial: Lee de localStorage o carga el JSON por defecto
  const [productos, setProductos] = useState(() => {
    try {
      const localData = localStorage.getItem('sazon_catalogo');
      return localData ? JSON.parse(localData) : initialProducts;
    } catch (error) {
      console.error("Error al leer de localStorage:", error);
      return initialProducts;
    }
  });

  // Efecto reactivo: Sincroniza cualquier cambio del array en localStorage
  useEffect(() => {
    localStorage.setItem('sazon_catalogo', JSON.stringify(productos));
  }, [productos]);

  // Métodos de gestión
  const agregarProducto = (nuevoProducto) => {
    setProductos((prevProductos) => [...prevProductos, nuevoProducto]);
  };

  const actualizarProducto = (sku, productoEditado) => {
    setProductos((prevProductos) =>
      prevProductos.map((prod) => (prod.sku === sku ? { ...prod, ...productoEditado } : prod))
    );
  };

  const eliminarProducto = (sku) => {
    setProductos((prevProductos) => prevProductos.filter((prod) => prod.sku !== sku));
  };

  const obtenerProductoPorId = (id) => {
    return productos.find((prod) => prod.id === id);
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

// Custom Hook para consumir el contexto fácilmente
export const useCatalogo = () => {
  const context = useContext(CatalogoContext);
  if (!context) {
    throw new Error("useCatalogo debe ser usado dentro de un CatalogoProvider");
  }
  return context;
};