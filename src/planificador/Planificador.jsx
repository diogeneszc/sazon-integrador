import { useMemo, useState } from 'react';
import { RECETAS, ALACENA_INICIAL } from '../js/datosMercado';
import useListaMercado from './useListaMercado';
import ListaMercado from './ListaMercado';

export default function Planificador() {
  // Recetas elegidas para la semana (por nombre).
  const [recetasElegidas, setRecetasElegidas] = useState([
    'Bandeja Paisa',
    'Arroz con Pollo',
    'Huevos Pericos',
  ]);

  // Ingredientes de las recetas elegidas. useMemo mantiene la referencia
  // estable entre renders, así el hook solo recalcula cuando cambia la selección.
  const ingredientes = useMemo(
    () =>
      RECETAS.filter((receta) => recetasElegidas.includes(receta.nombre)).flatMap(
        (receta) => receta.ingredientes
      ),
    [recetasElegidas]
  );

  // ALACENA_INICIAL es una constante de módulo: referencia estable.
  const { items, alternarComprado, pendientes } = useListaMercado(
    ingredientes,
    ALACENA_INICIAL
  );

  const alternarReceta = (nombre) => {
    setRecetasElegidas((previas) =>
      previas.includes(nombre)
        ? previas.filter((n) => n !== nombre)
        : [...previas, nombre]
    );
  };

  return (
    <main className="p-4 max-w-7xl mx-auto">
      <section
        className="planificador-recetas p-4 max-w-2xl mx-auto mb-6"
        aria-labelledby="titulo-recetas-semana"
      >
        <h2 id="titulo-recetas-semana" className="text-xl font-bold mb-3">
          Recetas de la semana
        </h2>
        <ul className="flex flex-col gap-2">
          {RECETAS.map((receta) => {
            const id = `receta-${receta.nombre}`;
            return (
              <li key={receta.nombre} className="planificador-item flex items-center gap-3 p-3 rounded-lg">
                <input
                  id={id}
                  type="checkbox"
                  checked={recetasElegidas.includes(receta.nombre)}
                  onChange={() => alternarReceta(receta.nombre)}
                  className="planificador-item-checkbox h-5 w-5 cursor-pointer"
                />
                <label htmlFor={id} className="flex-1 cursor-pointer">
                  {receta.nombre}
                </label>
              </li>
            );
          })}
        </ul>
      </section>

      <ListaMercado
        items={items}
        pendientes={pendientes}
        onAlternar={alternarComprado}
      />
    </main>
  );
}