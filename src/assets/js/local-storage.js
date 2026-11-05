export function guardarStorage(clave, valor) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(clave, JSON.stringify(valor));
  }
}

export function obtenerStorage(clave) {
  if (typeof localStorage !== 'undefined') {
    const item = localStorage.getItem(clave);
    return item ? JSON.parse(item) : null;
  }
  return null;
}

export function eliminarStorage(clave) {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(clave);
  }
}

if (typeof window !== 'undefined') {
  window.guardarStorage = guardarStorage;
  window.obtenerStorage = obtenerStorage;
  window.eliminarStorage = eliminarStorage;
}
