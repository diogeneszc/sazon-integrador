import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import Header from '../components/Header'
import CatalogoView from '../views/CatalogoView'

// Header ya trae Sidebar, TopBar, Breadcrumb, Footer, Toast y ThemeToggle,
// y pinta lo que reciba como children dentro de su <main>.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header>
      <CatalogoView />
    </Header>
  </StrictMode>,
)