import { productoServicio } from './productoServicio';

const RECETAS_REGISTROS = {
  128: {
    id: 128,
    codigoInterno: 'ID #RN-8492',
    codigoRecetaVerificada: 'RECETA N° 204',
    categoria: 'PLATO FUERTE NUTRESA',
    migas: [
      { label: 'Inicio', icon: 'bi-house', active: false },
      { label: 'Recetas de Almuerzo', icon: 'bi-book', active: false },
      { label: 'Pastas', icon: 'bi-tag', active: false },
      { label: 'Pasta cremosa con Salchicha Ranchera', icon: 'bi-journal-richtext', active: true }
    ],
    titulo: 'Pasta cremosa con Salchicha Ranchera Nutresa',
    subtituloIngredientes:
      'Fettuccine en Salsa Rosada Rústica con Salchicha Ranchera dorada al sarmiento, albahaca fresca y queso curado.',
    resumen:
      'Un clásico reconfortante con la sazón y ahumado inconfundible de Ranchera y toque de albahaca fresca. Ideal para elevar la mesa cotidiana con técnicas profesionales de emulsión cremosa.',
    autor: {
      nombre: 'Chef Nutresa Academy',
      credencial: 'Currículo Gastronómico Zenú & Ranchera',
      verificado: true
    },
    metadatos: {
      tiempoTotal: '35 mins',
      tiempoMiseEnPlace: '25 Minutos',
      porcionesBase: 4,
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
    ingredienteEstrella: {
      etiqueta: 'INGREDIENTE ESTRELLA',
      nombre: 'Salchicha Ranchera Nutresa',
      descripcion:
        'Elaborada con cortes cárnicos seleccionados y un perfil de ahumado natural patentado. Aporta una textura firme y jugosa que infunde una emulsión aromática en la base láctea de la pasta sin saturar el paladar.',
      aporteProteicoLabel: 'Aporte Proteico por Porción',
      aporteProteicoValor: '14g (28% IDR)',
      notaIzquierda: '0% Grasa Trans Añadida',
      notaDerecha: '100% Ahumado de Leña Noble'
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
    },
    relacionesIngredientes: [
      { idRelacion: 'rel-1', productoId: 501, cantidadBase: 300, unidad: 'g', preparacion: 'Cortada en medallones al sesgo' },
      { idRelacion: 'rel-2', productoId: 502, cantidadBase: 400, unidad: 'g', preparacion: 'Trigo durum fortificado' },
      { idRelacion: 'rel-3', productoId: 503, cantidadBase: 200, unidad: 'ml', preparacion: 'Base emulsionante para salsa suave' },
      { idRelacion: 'rel-4', productoId: 504, cantidadBase: 50, unidad: 'g', preparacion: 'Rallado fino para terminar el plato' },
      { idRelacion: 'rel-5', productoId: 505, cantidadBase: 2, unidad: 'dientes', preparacion: 'Macerado en pasta fina' },
      { idRelacion: 'rel-6', productoId: 506, cantidadBase: 1, unidad: 'manojo', preparacion: 'Hojas seleccionadas enteras' },
      { idRelacion: 'rel-7', productoId: 507, cantidadBase: 2, unidad: 'cdas', preparacion: 'Prensado en frío para salteado rápido' }
    ],
    preparacion: {
      etiquetaTecnica: 'TÉCNICA PROFESIONAL',
      marcasSubtitulo: 'Pasta Doria Clásica & Salchicha Ranchera',
      tituloSeccion: 'Paso a Paso Culinario',
      descripcionSeccion:
        'Fettuccine en crema de tomates rústicos, albahaca fresca y rodajas doradas de Salchicha Ranchera con queso grana padano rallado en mesa.',
      tiempoActivoTotal: '30 min de cocción',
      presentacionReferencia: {
        sello: 'Presentación de Referencia',
        imagen:
          'https://images.unsplash.com/photo-1621996346565-e3d5d6281298?auto=format&fit=crop&w=900&q=85',
        tituloPlato: 'Fettuccine Criollo Glaseado',
        porciones: '2 Porciones',
        descripcion:
          'Textura sedosa con contraste crocante en las salchichas y notas aromáticas de albahaca fresca del Huila.',
        indicadoresEstacion: {
          dificultad: 'Media',
          temperatura: '180°C Máx',
          tecnica: 'Salteado'
        },
        resumenNutricional: {
          caloriasTexto: '580 kcal por porción',
          macrosTexto: '24g Proteína · 48g Carbohidratos'
        },
        notaPausa: {
          titulo: '¿Necesitas pausa?',
          descripcion:
            'La pasta puede aguardar hasta 2 min en colador humedecida con unas gotas de aceite para evitar adherencia.'
        }
      },
      pasos: [
        {
          orden: 1,
          codigoVisual: '01',
          claseColorNumero: 'receta-paso-numero-verde',
          titulo: 'Paso 1: Cocción al dente de la Pasta Doria',
          parametroTecnico: '100°C ebullición',
          descripcion:
            'En una cacerola amplia, vierta 3 litros de agua con 30 g de sal marina. Al romper hervor a 100°C, incorpore 250 g de Fettuccine Doria. Mantenga el fuego alto sin tapar durante 8 minutos continuos hasta alcanzar una consistencia elástica y firme con nervio central íntegro.',
          duracionSegundos: 480,
          etiquetaTemporizador: '8:00 MIN',
          consejoChef: {
            icono: 'bi-lightbulb-fill',
            titulo: 'Consejo del Chef Sazón:',
            texto:
              'Reserve media taza (120 ml) del agua de cocción antes de escurrir; el almidón disuelto será el ligante clave para la mantecatura.'
          }
        },
        {
          orden: 2,
          codigoVisual: '02',
          claseColorNumero: 'receta-paso-numero-cobre',
          titulo: 'Paso 2: Dorado de la Salchicha Ranchera',
          parametroTecnico: 'Fuego medio-alto',
          descripcion:
            'Corte 3 unidades de Salchicha Ranchera en rodajas sesgadas de 1.5 cm. Dispóngalas sobre una sartén de fondo grueso precalentada con unas gotas de aceite de oliva. Selle por 3 minutos por lado hasta desarrollar una costra acaramelada y crujiente en sus bordes sin resecar el interior.',
          duracionSegundos: 240,
          etiquetaTemporizador: '4:00 MIN',
          consejoChef: {
            icono: 'bi-fire',
            titulo: 'Consejo del Chef Sazón:',
            texto:
              'No retire los jugos y sedimentos que quedan en el fondo de la sartén; aportarán el fondo ahumado característico para la salsa.'
          }
        },
        {
          orden: 3,
          codigoVisual: '03',
          claseColorNumero: 'receta-paso-numero-verde',
          titulo: 'Paso 3: Emulsión de crema y sofrito aromático',
          parametroTecnico: 'Fuego bajo-medio',
          descripcion:
            'Baje la intensidad a fuego suave. Agregue 2 dientes de ajo finamente picados y 150 g de tomates cherry cortados por la mitad. Saltee durante 2 minutos hasta ablandar la piel. Vierta 200 ml de crema de leche y una pizca de hojuelas de chile seco, removiendo en círculos para desglasar el fondo.',
          duracionSegundos: 300,
          etiquetaTemporizador: '5:00 MIN',
          consejoChef: {
            icono: 'bi-thermometer-half',
            titulo: 'Consejo del Chef Sazón:',
            texto:
              'Controle la temperatura para no cortar los lácteos; el sofrito debe burbujear con calma sin llegar a ebullición turbulenta.'
          }
        },
        {
          orden: 4,
          codigoVisual: '04',
          claseColorNumero: 'receta-paso-numero-verde',
          titulo: 'Paso 4: Integración y mantecatura del plato',
          parametroTecnico: 'Mantecatura 2 min',
          descripcion:
            'Traspase la pasta escurrida directamente a la sartén junto con las rodajas de Ranchera doradas. Añada un chorrito del agua de cocción reservada y remueva enérgicamente con pinzas culinarias durante 2 minutos hasta lograr un brillo untuoso y una salsa que se adhiera al fettuccine.',
          duracionSegundos: 120,
          etiquetaTemporizador: '2:00 MIN',
          consejoChef: null
        },
        {
          orden: 5,
          codigoVisual: '05',
          claseColorNumero: 'receta-paso-numero-cobre',
          titulo: 'Paso 5: Emplatado y decoración final',
          parametroTecnico: 'Servicio caliente',
          descripcion:
            'Sirva en vajilla rústica precalentada formando un nido con pinzas de montaje. Corone con las rodajas doradas más llamativas, los tomates cherry asados, hojas de albahaca fresca entera y escamas generosas de queso parmesano o pecorino maduro recién rallado.',
          duracionSegundos: 0,
          etiquetaTemporizador: null,
          consejoChef: null
        }
      ]
    }
  }
};

export const recetaServicio = {
  // HU 2.2.1: Búsqueda por ID
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
      }, 150);
    });
  },

  // HU 2.2.2: Comunicación cruzada segura con productoServicio
  async obtenerIngredientesDeReceta(id) {
    const receta = await this.buscarPorId(id);
    const ingredientesHidratados = await Promise.all(
      receta.relacionesIngredientes.map(async (rel) => {
        const producto = await productoServicio.obtenerPorId(rel.productoId);
        return {
          id: rel.idRelacion,
          productoId: rel.productoId,
          nombre: producto.nombre,
          marca: producto.marca,
          claseMarca: producto.claseMarca,
          icono: producto.icono,
          claseIcono: producto.claseIcono,
          enDespensa: producto.enDespensa,
          cantidadBase: rel.cantidadBase,
          unidad: rel.unidad,
          preparacion: rel.preparacion
        };
      })
    );

    return {
      recetaResumen: {
        id: receta.id,
        codigoRecetaVerificada: receta.codigoRecetaVerificada,
        titulo: receta.titulo,
        subtituloIngredientes: receta.subtituloIngredientes,
        imagenPrincipal: receta.multimedia.imagenPrincipal,
        dificultad: receta.metadatos.dificultad,
        tiempoMiseEnPlace: receta.metadatos.tiempoMiseEnPlace,
        porcionesBase: receta.metadatos.porcionesBase,
        ingredienteEstrella: receta.ingredienteEstrella
      },
      ingredientes: ingredientesHidratados
    };
  },

  // HU 2.2.3: Obtención de pasos en orden numérico secuencial
  async obtenerPasosDeReceta(id) {
    const receta = await this.buscarPorId(id);
    const pasosOrdenados = [...receta.preparacion.pasos].sort(
      (a, b) => Number(a.orden) - Number(b.orden)
    );
    return {
      recetaId: receta.id,
      tituloReceta: receta.titulo,
      ...receta.preparacion,
      pasos: pasosOrdenados
    };
  }
};