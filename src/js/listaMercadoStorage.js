// Servicio de persistencia: solo habla con localStorage, no conoce React.
// Guarda únicamente los ids de los productos marcados como comprados.

const CLAVE_COMPRADOS = 'sazon_lista_mercado_comprados';

export function cargarComprados() {
  if (typeof localStorage === 'undefined') return [];
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_COMPRADOS));
    return Array.isArray(guardado) ? guardado : [];
  } catch {
    return [];
  }
}

export function guardarComprados(ids = []) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(CLAVE_COMPRADOS, JSON.stringify(ids));
  } catch {
    // Almacenamiento lleno o bloqueado: la app sigue funcionando sin persistir.
  }
}