import { useState } from 'react';

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const MOMENTOS = ['Desayuno', 'Almuerzo', 'Cena', 'Snack'];

export default function PlanSemanal() {
  const [calendario, setCalendario] = useState({});
  const [recetaInput, setRecetaInput] = useState('');
  const [seleccionActual, setSeleccionActual] = useState({ dia: 'Lunes', momento: 'Desayuno' });

  const handleAsignarReceta = (e) => {
    e.preventDefault();
    if (!recetaInput.trim()) return;

    const clave = `${seleccionActual.dia}-${seleccionActual.momento}`;
    setCalendario({
      ...calendario,
      [clave]: recetaInput.trim()
    });
    setRecetaInput('');
  };

  const handleEliminarReceta = (dia, momento) => {
    const clave = `${dia}-${momento}`;
    const nuevoCalendario = { ...calendario };
    delete nuevoCalendario[clave];
    setCalendario(nuevoCalendario);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Formulario de asignación */}
      <form onSubmit={handleAsignarReceta} className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Día:</label>
          <select 
            value={seleccionActual.dia}
            onChange={(e) => setSeleccionActual({ ...seleccionActual, dia: e.target.value })}
            className="border rounded p-2 text-sm"
          >
            {DIAS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Momento de Comida:</label>
          <select 
            value={seleccionActual.momento}
            onChange={(e) => setSeleccionActual({ ...seleccionActual, momento: e.target.value })}
            className="border rounded p-2 text-sm"
          >
            {MOMENTOS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Receta:</label>
          <input 
            type="text"
            value={recetaInput}
            onChange={(e) => setRecetaInput(e.target.value)}
            placeholder="Ej. Ensalada César, Bandeja Paisa..."
            className="border rounded p-2 text-sm w-full"
          />
        </div>

        <button 
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-700 transition"
        >
          Asignar Receta
        </button>
      </form>

      {/* Cuadrícula del Calendario Semanal */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {DIAS.map(dia => (
          <div key={dia} className="bg-white rounded-lg shadow border border-gray-200 flex flex-col">
            <div className="bg-gray-100 p-3 font-bold text-center text-gray-700 border-b">
              {dia}
            </div>
            <div className="p-3 flex-1 flex flex-col gap-3">
              {MOMENTOS.map(momento => {
                const clave = `${dia}-${momento}`;
                const recetaAsignada = calendario[clave];

                return (
                  <div key={momento} className="border border-dashed border-gray-300 rounded p-2 bg-gray-50">
                    <span className="text-xs font-semibold text-gray-500 uppercase block mb-1">{momento}</span>
                    {recetaAsignada ? (
                      <div className="flex justify-between items-center bg-white p-2 rounded shadow-sm border">
                        <span className="text-sm text-gray-800 font-medium">{recetaAsignada}</span>
                        <button 
                          type="button"
                          onClick={() => handleEliminarReceta(dia, momento)}
                          className="text-red-500 hover:text-red-700 text-xs font-bold ml-2"
                          title="Eliminar"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Vacío</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}