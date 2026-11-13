function GarantiaComunitaria() {
  return (
    <aside className="bg-sazon-cacao text-sazon-cacaoText rounded-2xl shadow-sm p-5 sm:p-6 flex items-center gap-4">
      <span className="w-12 h-12 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-2xl text-sazon-hoja">
        <i className="bi bi-patch-check"></i>
      </span>
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-sazon-hoja m-0 mb-1">
          Garantía comunitaria de sabor
        </h3>
        <p className="text-sm leading-relaxed m-0">
          Cada reseña se valida contra el estándar gastronómico Nutresa Gourmet, garantizando combinaciones nutritivas y
          cero desperdicio.
        </p>
      </div>
    </aside>
  )
}

export default GarantiaComunitaria
