import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/Header'
import Comunidad from './comunidad/valoracion/Comunidad'
import { Favoritos } from './comunidad/favoritos'

export function App() {
  const [vista, setVista] = useState('favoritos')

  return (
    <Header>
      <nav className="mb-6 flex gap-2" aria-label="Módulos de comunidad">
        <button
          type="button"
          aria-pressed={vista === 'valoraciones'}
          className={`rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
            vista === 'valoraciones'
              ? 'bg-emerald-800 text-white shadow-sm dark:bg-emerald-400 dark:text-emerald-950'
              : 'border border-slate-200 bg-white text-slate-700 hover:border-emerald-700 hover:text-emerald-800 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-emerald-300 dark:hover:text-emerald-200'
          }`}
          onClick={() => setVista('valoraciones')}
        >
          Valoraciones
        </button>
        <button
          type="button"
          aria-pressed={vista === 'favoritos'}
          className={`rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
            vista === 'favoritos'
              ? 'bg-emerald-800 text-white shadow-sm dark:bg-emerald-400 dark:text-emerald-950'
              : 'border border-slate-200 bg-white text-slate-700 hover:border-emerald-700 hover:text-emerald-800 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-emerald-300 dark:hover:text-emerald-200'
          }`}
          onClick={() => setVista('favoritos')}
        >
          Favoritos
        </button>
      </nav>
      {vista === 'favoritos' ? <Favoritos /> : <Comunidad />}
    </Header>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)