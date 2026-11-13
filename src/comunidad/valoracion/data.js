// Datos de ejemplo para el módulo Comunidad (Célula 6).
// Reemplazar por la respuesta del backend cuando esté disponible.

export const RECETA_DESTACADA = {
  id: 'RC-2849',
  titulo: 'Pasta Penne Doria con Rodajas Ranchera Zenú',
  descripcion:
    'Sazón hogareño con el toque artesanal de hierbas de huerta, tomates asados y reducción suave en mantequilla.',
  etiquetaImagen: 'Zenú + Doria',
  imagen: null,
  tiempo: '25 min',
  porciones: 4,
  ahorro: '45% despensa',
  promedio: 4.8,
  totalEvaluaciones: 142,
}

export const DISTRIBUCION = {
  recomendado: 98.2,
  niveles: [
    { estrellas: 5, porcentaje: 82, cantidad: 116 },
    { estrellas: 4, porcentaje: 13, cantidad: 18 },
    { estrellas: 3, porcentaje: 3, cantidad: 5 },
    { estrellas: 2, porcentaje: 1, cantidad: 2 },
    { estrellas: 1, porcentaje: 1, cantidad: 1 },
  ],
  criterios: [
    { nombre: 'Sabor Nutresa', valor: 4.9 },
    { nombre: 'Facilidad', valor: 4.7 },
    { nombre: 'Ahorro', valor: 4.8 },
  ],
}

export const CRITERIOS_FORMULARIO = [
  { id: 'sabor', nombre: 'Sabor Nutresa', ayuda: 'Intensidad & balance', inicial: 5 },
  { id: 'facilidad', nombre: 'Facilidad', ayuda: 'Paso a paso claro', inicial: 5 },
  { id: 'ahorro', nombre: 'Ahorro Alacena', ayuda: 'Cero desperdicio', inicial: 4 },
]

export const RESENAS = [
  {
    id: 1,
    autor: 'Carlos Restrepo',
    iniciales: 'CR',
    colorAvatar: 'bg-sazon-verdeNoche',
    ciudad: 'Medellín',
    rol: 'Chef NV. 3',
    verificado: true,
    hace: 'Hace 2h',
    fecha: '2026-11-12T08:00:00',
    puntuacion: 5,
    criterioDestacado: 'Sabor 5/5',
    texto:
      'Excelente combinación. Recomiendo dorar bien las rodajas de Ranchera en sartén de hierro antes de mezclar con la pasta Doria al dente para sellar los jugos ahumados.',
    imagen: null,
    conFoto: true,
    truco: null,
    meGusta: 28,
    leGusta: true,
    respuestas: 4,
  },
  {
    id: 2,
    autor: 'Lucía Cárdenas',
    iniciales: 'LC',
    colorAvatar: 'bg-sazon-verdeHoja',
    ciudad: 'Cali',
    rol: 'Hogar Cero Desperdicio',
    verificado: true,
    hace: 'Ayer',
    fecha: '2026-11-11T19:00:00',
    puntuacion: 4,
    criterioDestacado: 'Facilidad 5/5',
    texto:
      'Súper rápida para la cena de los niños. Solo necesité 1 paquete de penne y 1 de ranchera. Recomiendo agregar unas cucharadas de crema de leche o queso blanco costeño rallado encima.',
    imagen: null,
    truco: 'Usé 200ml de agua de cocción de la pasta para suavizar la salsa.',
    meGusta: 15,
    leGusta: false,
    respuestas: 2,
  },
  {
    id: 3,
    autor: 'Felipe Arias',
    iniciales: 'FA',
    colorAvatar: 'bg-sazon-cacao',
    ciudad: 'Bogotá',
    rol: 'Asesor Culinario',
    verificado: true,
    hace: 'Hace 3d',
    fecha: '2026-11-09T13:00:00',
    puntuacion: 5,
    criterioDestacado: 'Ahorro 5/5',
    texto:
      'El balance graso de la Ranchera Zenú liga perfecto con la textura estriada de Doria Penne. Para un maridaje completo en casa, el aroma de una taza de Café Sello Rojo luego del almuerzo cierra la experiencia redonda.',
    imagen: null,
    conFoto: true,
    truco: null,
    meGusta: 42,
    leGusta: true,
    respuestas: 7,
  },
]

export const ETIQUETAS_PUNTUACION = {
  1: 'Necesita mejorar',
  2: 'Regular',
  3: 'Buena',
  4: 'Muy buena',
  5: 'Excelente experiencia',
}
