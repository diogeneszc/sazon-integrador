import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RecetarioModulo from './RecetarioModulo';

const contenedorModulo = document.getElementById('module-content');

if (contenedorModulo) {
  createRoot(contenedorModulo).render(
    <StrictMode>
      <RecetarioModulo recetaId={128} />
    </StrictMode>
  );
}
