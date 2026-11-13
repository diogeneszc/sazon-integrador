const CATALOGO_PRODUCTOS_PRIVADO = {
  501: {
    id: 501,
    nombre: 'Salchicha Ranchera Clásica',
    marca: 'Ranchera',
    claseMarca: 'receta-ing-marca-ranchera',
    icono: 'bi-record-circle-fill',
    claseIcono: 'receta-ing-icon-ranchera',
    enDespensa: true
  },
  502: {
    id: 502,
    nombre: 'Pasta Fettuccine Doria',
    marca: 'Doria',
    claseMarca: 'receta-ing-marca-doria',
    icono: 'bi-hurricane',
    claseIcono: 'receta-ing-icon-doria',
    enDespensa: true
  },
  503: {
    id: 503,
    nombre: 'Crema de Leche Entera',
    marca: 'Zenú',
    claseMarca: 'receta-ing-marca-zenu',
    icono: 'bi-droplet-half',
    claseIcono: 'receta-ing-icon-neutro',
    enDespensa: false
  },
  504: {
    id: 504,
    nombre: 'Queso Parmesano Maduro',
    marca: 'Fresco',
    claseMarca: 'receta-ing-marca-fresco',
    icono: 'bi-pie-chart-fill',
    claseIcono: 'receta-ing-icon-neutro',
    enDespensa: true
  },
  505: {
    id: 505,
    nombre: 'Ajo Fresco Confitado',
    marca: 'Fresco',
    claseMarca: 'receta-ing-marca-fresco',
    icono: 'bi-flower2',
    claseIcono: 'receta-ing-icon-neutro',
    enDespensa: true
  },
  506: {
    id: 506,
    nombre: 'Albahaca Fresca Criolla',
    marca: 'Fresco',
    claseMarca: 'receta-ing-marca-fresco',
    icono: 'bi-Feather',
    claseIcono: 'receta-ing-icon-hoja',
    enDespensa: false
  },
  507: {
    id: 507,
    nombre: 'Aceite de Oliva Extra Virgen',
    marca: 'Fresco',
    claseMarca: 'receta-ing-marca-fresco',
    icono: 'bi-droplet-fill',
    claseIcono: 'receta-ing-icon-neutro',
    enDespensa: true
  }
};

export const productoServicio = {
  async obtenerPorId(productoId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const prod = CATALOGO_PRODUCTOS_PRIVADO[Number(productoId)];
        if (prod) {
          resolve(structuredClone(prod));
        } else {
          reject(new Error(`Producto ${productoId} no encontrado en catálogo Nutresa`));
        }
      }, 60);
    });
  }
};