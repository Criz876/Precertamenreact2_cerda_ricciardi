import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { exportToExcel, exportToPDF, exportToPNG } from '../utils/exportHelpers';

export const TablaComida = () => {
  const [comidas, setComidas] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const data = await getDocs(collection(db, "comida"));
      const lista = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      
      // ORDENAMIENTO: Congelados (true) primero
      const listaOrdenada = lista.sort((a, b) => (a.esCongelado === b.esCongelado ? 0 : a.esCongelado ? -1 : 1));
      setComidas(listaOrdenada);
    };
    obtenerDatos();
  }, []);

  const handlePDF = () => {
    const dataClean = comidas.map(c => ({ Alimento: c.nombre, Congelado: c.esCongelado ? "Sí" : "No" }));
    exportToPDF(['Alimento', 'Es Congelado'], dataClean, 'Lista_Comida');
  };

  return (
    <div className="tabla-container">
      <h2>🍗 Comida (Congelados Primero)</h2>
      <div className="btn-group">
        <button className="btn btn-primary" onClick={handlePDF}>PDF</button>
        <button className="btn btn-success" onClick={() => exportToExcel(comidas, 'Comida')}>Excel</button>
        <button className="btn btn-warning" onClick={() => exportToPNG('tabla-comida', 'Comida')}>PNG</button>
      </div>

      <table id="tabla-comida" className="custom-table">
        <thead>
          <tr>
            <th>Alimento</th>
            <th>¿Congelado?</th>
          </tr>
        </thead>
        <tbody>
          {comidas.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>{item.esCongelado ? "🧊 Sí" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};