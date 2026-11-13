function CriterioSlider({ id, nombre, ayuda, valor, max = 5, onChange }) {
  const inputId = `criterio-${id}`

  return (
    <div className="bg-sazon-marfil dark:bg-sazon-verdeNutresa rounded-xl p-3">
      <label htmlFor={inputId} className="flex justify-between text-xs font-semibold text-sazon-texto dark:text-slate-200">
        <span>{nombre}</span>
        <span>
          {valor}/{max}
        </span>
      </label>
      <input
        id={inputId}
        type="range"
        min={1}
        max={max}
        step={1}
        value={valor}
        onChange={(e) => onChange(id, Number(e.target.value))}
        className="w-full my-2 accent-sazon-verdeNoche dark:accent-sazon-verdeNeon cursor-pointer"
      />
      <p className="text-[11px] text-sazon-texto2 dark:text-slate-400 m-0">{ayuda}</p>
    </div>
  )
}

export default CriterioSlider
