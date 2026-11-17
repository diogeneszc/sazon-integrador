// Lógica pura: sin React, sin DOM, sin efectos secundarios.
// Forma esperada de cada ingrediente: { nombre: string, cantidad: number, unidad: string }

const normalizar = (texto = '') =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

export const claveIngrediente = ({ nombre, unidad }) =>
  `${normalizar(nombre)}|${normalizar(unidad)}`;

// Incremento: suma las cantidades de ingredientes repetidos (mismo nombre y unidad).
export function consolidarIngredientes(ingredientes = []) {
  const acumulado = new Map();

  ingredientes.forEach((ingrediente) => {
    const clave = claveIngrediente(ingrediente);
    const previo = acumulado.get(clave);
    acumulado.set(
      clave,
      previo
        ? { ...previo, cantidad: previo.cantidad + ingrediente.cantidad }
        : { ...ingrediente }
    );
  });

  return [...acumulado.values()];
}

// Resta: lo requerido menos lo que ya hay en la alacena; solo queda lo que falta comprar.
export function calcularListaMercado(ingredientes = [], alacena = []) {
  const existencias = new Map(
    consolidarIngredientes(alacena).map((item) => [
      claveIngrediente(item),
      item.cantidad,
    ])
  );

  return consolidarIngredientes(ingredientes)
    .map((ingrediente) => ({
      ...ingrediente,
      cantidad:
        ingrediente.cantidad - (existencias.get(claveIngrediente(ingrediente)) ?? 0),
    }))
    .filter((ingrediente) => ingrediente.cantidad > 0)
    .map((ingrediente) => ({ id: claveIngrediente(ingrediente), ...ingrediente }));
}