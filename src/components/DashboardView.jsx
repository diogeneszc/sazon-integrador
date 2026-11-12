import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header'; 
import Footer from './Footer';
import CatalogoMaestro from './CatalogoMaestro';

function DashboardView() {
  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      
      <Sidebar />

      <div className="flex-1 flex flex-col w-full">
        
        <Header />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <CatalogoMaestro />
        </main>
        
        {/* El Footer debe ir al final, después de cerrar la etiqueta main */}
        <Footer />

      </div>
    </div>
  );
}

export default DashboardView;