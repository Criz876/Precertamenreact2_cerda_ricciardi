import React, { Fragment } from 'react';
import "./css/estilos.css"; 

// Importamos los 3 componentes requeridos por el certamen
import { TablaRegalos } from './components/TablaRegalos';
import { TablaComida } from './components/TablaComida';
import { TablaAdornos } from './components/TablaAdornos';

export function App() {
  return (
    <Fragment>
      <div className="main-container">
        <h1>Pre Certamen 2 - Planificación Navidad</h1>
        <hr />
        
        {/* Requisito: Misma vista, diferentes componentes */}
        <TablaRegalos />
        <TablaComida />
        <TablaAdornos />
      </div>
    </Fragment>
  );
}
export default App;