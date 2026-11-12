import { useState } from 'react';
import { useCatalogo } from '../context/CatalogoContext';

const MARCAS = ['Zenú', 'Doria', 'Pietrán', 'Noel', 'Sello Rojo', 'Jet'];
const CATEGORIAS = ['Cárnicos', 'Pastas', 'Galletas', 'Cafés', 'Chocolates'];

export default function CatalogoMaestro() {
  const { productos, agregarProducto, eliminarProducto } = useCatalogo();

  // Estado del formulario
  const [formData, setFormData] = useState({
    sku: '',
    nombre: '',
    marca: '',
    categoria: '',
    presentacion: '',
    unidad: 'g',
    precio: ''
  });
  const [error, setError] = useState('');

  // Validaciones y Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // 1. Validar campos obligatorios de selectores
    if (!formData.marca || !formData.categoria) {
      return setError('La marca y la categoría son obligatorias.');
    }

    // 2. Validar precios y gramajes estrictamente positivos
    if (Number(formData.presentacion) <= 0 || Number(formData.precio) <= 0) {
      return setError('La presentación y el precio deben ser números estrictamente positivos.');
    }

    // 3. Validar SKU alfanumérico (permite guiones)
    const skuRegex = /^[a-zA-Z0-9-]+$/;
    if (!skuRegex.test(formData.sku)) {
      return setError('El SKU debe ser alfanumérico (solo letras, números y guiones).');
    }

    // 4. Validar SKU único
    const skuExiste = productos.some((p) => p.sku === formData.sku);
    if (skuExiste) {
      return setError('Este código SKU ya existe en el catálogo.');
    }

    // Guardar producto
    agregarProducto({
      id: Date.now().toString(),
      sku: formData.sku,
      nombre: formData.nombre,
      marca: formData.marca,
      categoria: formData.categoria,
      presentacion: `${formData.presentacion} ${formData.unidad}`,
      precio: Number(formData.precio),
      stock: 0 // Valor por defecto
    });

    // Limpiar formulario
    setFormData({ sku: '', nombre: '', marca: '', categoria: '', presentacion: '', unidad: 'g', precio: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="font-inter space-y-6 max-w-7xl mx-auto text-slate-800">
      
      {/* HEADER[cite: 7] */}
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="bg-[#84cc16] text-white px-2 py-0.5 rounded-sm">HU-CEL01-01</span>
          <span className="text-[#84cc16]">CÉLULA 1 - PRODUCCIÓN & FICHAS DIGITALES</span>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-[#114622]">Catálogo Maestro de Productos Nutresa</h1>
            <p className="text-sm text-slate-500 mt-1">Gestión centralizada de SKUs, marcas corporativas homologadas y especificaciones técnicas para el recetario digital institucional.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium hover:bg-slate-50">Auditoría de Cambios</button>
            <button className="px-4 py-2 bg-[#84cc16] text-white rounded-md text-sm font-medium hover:bg-[#65a30d]">+ Nuevo Producto</button>
          </div>
        </div>
      </header>

      {/* KPIS[cite: 7] */}
      <section className="grid grid-cols-4 gap-4">
        {[
          { title: 'TOTAL SKUS', value: productos.length, sub: 'Productos certificados en base', extra: '+12 mes' },
          { title: 'MARCAS ACTIVAS', value: MARCAS.length, sub: 'Zenú, Doria, Pietrán, Noel, Sello Rojo, Jet', extra: '100% Corp' },
          { title: 'LÍNEAS / CATEGORÍAS', value: CATEGORIAS.length, sub: 'Cárnicos, Pastas, Galletas, Cafés, Chocolates', extra: 'Líneas Base' },
          { title: 'FICHA TÉCNICA COMPLETA', value: '98.4%', sub: '', extra: 'Óptimo' }
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
              <span>{kpi.title}</span>
              <i className="bi bi-box-seam"></i>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#114622]">{kpi.value}</span>
              <span className="text-xs text-[#84cc16] font-medium">{kpi.extra}</span>
            </div>
            <p className="text-xs text-slate-500 mt-2 h-8">{kpi.sub}</p>
          </div>
        ))}
      </section>

      {/* FORMULARIO[cite: 7] */}
      <section className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#84cc16] rounded-l-xl"></div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-bold text-[#114622] flex items-center gap-2">
              <span className="w-2 h-6 bg-[#84cc16] rounded-sm inline-block"></span>
              Registrar Nuevo Producto Nutresa
            </h2>
            <p className="text-xs text-slate-500 ml-4">Diligencia la información técnica requerida para la vinculación en fichas de preparación y recetarios.</p>
          </div>
        </div>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-3 gap-5">
            {/* Fila 1 */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1">CÓDIGO SKU CORPORATIVO *</label>
              <input type="text" name="sku" value={formData.sku} onChange={handleChange} required className="w-full border border-slate-200 rounded-md p-2 text-sm focus:outline-none focus:border-[#84cc16]" placeholder="NUT-ZEN-0428" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1">NOMBRE OFICIAL DEL PRODUCTO *</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required className="w-full border border-slate-200 rounded-md p-2 text-sm focus:outline-none focus:border-[#84cc16]" placeholder="Ej: Salchicha Tradicional Zenú 500g" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1">MARCA CORPORATIVA HOMOLOGADA *</label>
              <select name="marca" value={formData.marca} onChange={handleChange} required className="w-full border border-slate-200 rounded-md p-2 text-sm focus:outline-none focus:border-[#84cc16]">
                <option value="">Seleccione una marca...</option>
                {MARCAS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            {/* Fila 2 */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1">CATEGORÍA DEL ALIMENTO *</label>
              <select name="categoria" value={formData.categoria} onChange={handleChange} required className="w-full border border-slate-200 rounded-md p-2 text-sm focus:outline-none focus:border-[#84cc16]">
                <option value="">Seleccione categoría...</option>
                {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-slate-400 mb-1">PRESENTACIÓN / GRAMAJE *</label>
                <input type="number" name="presentacion" value={formData.presentacion} onChange={handleChange} required className="w-full border border-slate-200 rounded-md p-2 text-sm focus:outline-none focus:border-[#84cc16]" placeholder="500" />
              </div>
              <div className="w-20">
                <label className="block text-[10px] font-bold text-transparent mb-1">.</label>
                <select name="unidad" value={formData.unidad} onChange={handleChange} className="w-full border border-slate-200 rounded-md p-2 text-sm bg-slate-50">
                  <option value="g">g</option>
                  <option value="ml">ml</option>
                  <option value="und">und</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1">PRECIO SUGERIDO (COP) *</label>
              <input type="number" name="precio" value={formData.precio} onChange={handleChange} required className="w-full border border-slate-200 rounded-md p-2 text-sm focus:outline-none focus:border-[#84cc16]" placeholder="$ 14500" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={() => setFormData({ sku: '', nombre: '', marca: '', categoria: '', presentacion: '', unidad: 'g', precio: '' })} className="px-5 py-2 border border-slate-200 rounded-md text-sm font-medium hover:bg-slate-50">Cancelar / Limpiar</button>
            <button type="submit" className="px-5 py-2 bg-[#84cc16] text-white rounded-md text-sm font-bold hover:bg-[#65a30d]">Guardar Producto en Catálogo</button>
          </div>
        </form>
      </section>

      {/* TABLA DE PRODUCTOS[cite: 7] */}
      <section className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <input type="text" placeholder="Buscar por SKU o Nombre de Producto..." className="w-1/3 border border-slate-200 rounded-md p-2 text-sm focus:outline-none" />
          <div className="flex gap-2">
            <select className="border border-slate-200 rounded-md p-2 text-sm"><option>Todas las Marcas</option></select>
            <select className="border border-slate-200 rounded-md p-2 text-sm"><option>Todas las Categorías</option></select>
            <button className="px-3 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium"><i className="bi bi-download mr-2"></i>Exportar CSV</button>
          </div>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold">
            <tr>
              <th className="p-4">SKU</th>
              <th className="p-4">NOMBRE PRODUCTO</th>
              <th className="p-4">MARCA</th>
              <th className="p-4">CATEGORÍA</th>
              <th className="p-4">PRESENTACIÓN</th>
              <th className="p-4">PRECIO SUGERIDO</th>
              <th className="p-4 text-center">ACCIONES</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {productos.length === 0 ? (
              <tr><td colSpan="7" className="p-8 text-center text-slate-500">No hay productos registrados en el catálogo.</td></tr>
            ) : (
              productos.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-50">
                  <td className="p-4 font-medium">{prod.sku}</td>
                  <td className="p-4 font-bold text-[#114622]">{prod.nombre}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-slate-100 rounded-full text-xs font-medium border border-slate-200">
                      {prod.marca}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">{prod.categoria || 'N/A'}</td>
                  <td className="p-4 text-slate-500">{prod.presentacion || `${prod.stock} unids`}</td>
                  <td className="p-4 font-medium text-[#84cc16]">${prod.precio.toLocaleString('es-CO')} COP</td>
                  <td className="p-4 text-center">
                    <button onClick={() => eliminarProducto(prod.sku)} className="text-slate-400 hover:text-red-500 transition-colors">
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}