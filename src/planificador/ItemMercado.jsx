import { useId } from 'react';

export default function ItemMercado({ item, onAlternar }) {
  const inputId = useId();

  return (
    <li
      className={`planificador-item flex items-center gap-3 p-3 rounded-lg ${
        item.comprado ? 'planificador-item-comprado' : ''
      }`}
    >
      <input
        id={inputId}
        type="checkbox"
        checked={item.comprado}
        onChange={() => onAlternar(item.id)}
        className="planificador-item-checkbox h-5 w-5 cursor-pointer"
      />
      <label
        htmlFor={inputId}
        className={`flex-1 cursor-pointer ${
          item.comprado ? 'planificador-item-tachado' : ''
        }`}
      >
        <span className="font-semibold">{item.nombre}</span>
        <span className="ml-2 text-sm">
          {item.cantidad} {item.unidad}
        </span>
      </label>
    </li>
  );
}