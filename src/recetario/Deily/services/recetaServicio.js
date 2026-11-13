const RECETAS_REGISTROS = {
  128: {
    id: 128,
    codigoInterno: 'ID #RN-8492',
    categoria: 'PLATO FUERTE NUTRESA',
    migas: [
      { label: 'Inicio', icon: 'bi-house', active: false },
      { label: 'Recetas de Almuerzo', icon: 'bi-book', active: false },
      { label: 'Pastas', icon: 'bi-tag', active: false },
      { label: 'Pasta cremosa con Salchicha Ranchera', icon: 'bi-journal-richtext', active: true }
    ],
    titulo: 'Pasta cremosa con Salchicha Ranchera Nutresa',
    resumen:
      'Un clásico reconfortante con la sazón y ahumado inconfundible de Ranchera y toque de albahaca fresca. Ideal para elevar la mesa cotidiana con técnicas profesionales de emulsión cremosa.',
    autor: {
      nombre: 'Chef Nutresa Academy',
      credencial: 'Currículo Gastronómico Zenú & Ranchera',
      verificado: true
    },
    metadatos: {
      tiempoTotal: '35 mins',
      porcionesTexto: '4 personas',
      dificultad: 'Intermedia',
      energiaPorPorcion: '540 kcal',
      unidadEnergia: '/ porc'
    },
    multimedia: {
      imagenPrincipal:
        'https://images.unsplash.com/photo-1621996346565-e3d5d6281298?auto=format&fit=crop&w=1400&q=85',
      etiquetasSuperiores: [
        { texto: 'RECETA DESTACADA', tipo: 'destacada', icono: 'bi-stars' },
        { texto: 'NUTRESA ORIGINAL', tipo: 'original', icono: 'bi-award-fill' }
      ],
      calidadVideo: 'MasterClass 4K disponible',
      tecnicaClave: {
        etiqueta: 'TÉCNICA CLAVE',
        descripcion: 'Sellado dorado de salchicha & reducción de crema con pasta al dente'
      },
      comunidadActiva: {
        sellos: ['ZN', 'RC', 'DR'],
        texto: '+1.2k Chefs la cocinaron hoy'
      }
    },
    nutricion: {
      porcionReferencia: 'PORCIÓN 280G',
      descripcion:
        'Aporte energético balanceado con alta fuente proteica cárnica y carbohidratos complejos de trigo durum.',
      calorias: 540,
      macros: [
        { nombre: 'Carbos', cantidad: '58g', claseColor: 'receta-detalle-dot-carbos' },
        { nombre: 'Proteína', cantidad: '24g', claseColor: 'receta-detalle-dot-proteina' },
        { nombre: 'Grasas', cantidad: '19g', claseColor: 'receta-detalle-dot-grasas' }
      ],
      avalTexto: 'Programa Nutrición Consciente',
      avalEstado: 'Avalado'
    },
    ingredientesClaveDespensa: {
      selloDerecho: 'DESPENSA VERIFICADA NUTRESA',
      descripcion:
        'La textura crocante y el toque ahumado dependen de ingredientes con los más rigurosos estándares de maduración y frescura.',
      destacados: [
        {
          id: 'ing-1',
          marca: 'RANCHERA',
          claseMarca: 'receta-detalle-badge-ranchera',
          nombre: 'Salchicha Ranchera Tradicional',
          cantidadDetalle: '300g cortada en rodajas diagonales',
          notaCalidad: 'Ahumado de maderas duras'
        },
        {
          id: 'ing-2',
          marca: 'PASTAS DORIA',
          claseMarca: 'receta-detalle-badge-doria',
          nombre: 'Fettuccine o Tagliatelle Doria',
          cantidadDetalle: '400g cocida al dente en agua con sal',
          notaCalidad: 'Trigo 100% seleccionado'
        },
        {
          id: 'ing-3',
          marca: 'LÁCTEOS & HIERBAS',
          claseMarca: 'receta-detalle-badge-lacteos',
          nombre: 'Crema de Leche & Albahaca',
          cantidadDetalle: '200ml crema fresca + albahaca genovesa',
          notaCalidad: 'Emulsión sedosa artesanal'
        }
      ]
    }
  }
};

export const recetaServicio = {
  async buscarPorId(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const numericId = Number(id);
        const registro = RECETAS_REGISTROS[numericId];
        if (registro) {
          resolve(structuredClone(registro));
        } else {
          reject(new Error(`No se encontró la receta con ID ${id}`));
        }
      }, 180);
    });
  }
};