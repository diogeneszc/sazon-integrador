import ItemMercado from './ItemMercado';

export default function ListaMercado({ items, pendientes, onAlternar }) {
  return (
    <section
      className="planificador-lista-mercado p-4 max-w-2xl mx-auto"
      aria-labelledby="titulo-lista-mercado"
    >
      <header className="flex items-center justify-between mb-4">
        <h2 id="titulo-lista-mercado" className="text-xl font-bold">
          Lista de mercado
        </h2>
        <output className="text-sm" aria-live="polite">
          {pendientes} por comprar
        </output>
      </header>

      {items.length === 0 ? (
        <p className="text-sm italic">
          Tu alacena ya cubre todo. No hay nada por comprar.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <ItemMercado key={item.id} item={item} onAlternar={onAlternar} />
          ))}
        </ul>
      )}
    </section>
  );
}