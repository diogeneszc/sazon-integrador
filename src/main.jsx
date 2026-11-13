import React from 'react';
import ReactDOM from 'react-dom/client';
import DashboardView from './components/DashboardView.jsx';
import { CatalogoProvider } from './context/CatalogoContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CatalogoProvider>
      <DashboardView />
    </CatalogoProvider>
  </React.StrictMode>
);