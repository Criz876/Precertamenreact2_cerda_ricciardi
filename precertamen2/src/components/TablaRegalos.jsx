import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { exportToExcel, exportToPDF, exportToPNG } from '../utils/exportHelpers';

export const TablaRegalos = () => {
  const [regalos, setRegalos] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const data = await getDocs(collection(db, "regalos"));
      const lista = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      
      // ORDENAMIENTO: Prioridad (número menor a mayor o viceversa, asumimos 1 es mayor prioridad)
      const listaOrdenada = lista.sort((a, b) => a.prioridad - b.prioridad);
      setRegalos(listaOrdenada);
    };
    obtenerDatos();
  }, []);

  const handlePDF = () => {
    const dataClean = regalos.map(r => ({ Nombre: r.nombre, Familiar: r.familiar, Prioridad: r.prioridad }));
    exportToPDF(['Nombre', 'Familiar', 'Prioridad'], dataClean, 'Lista_Regalos');
  };

  return (
    <div className="tabla-container">
      <h2>🎁 Regalos (Por Prioridad)</h2>
      <div className="btn-group">
        <button className="btn btn-primary" onClick={handlePDF}>PDF</button>
        <button className="btn btn-success" onClick={() => exportToExcel(regalos, 'Regalos')}>Excel</button>
        <button className="btn btn-warning" onClick={() => exportToPNG('tabla-regalos', 'Regalos')}>PNG</button>
      </div>
      
      <table id="tabla-regalos" className="custom-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Familiar</th>
            <th>Prioridad</th>
          </tr>
        </thead>
        <tbody>
          {regalos.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>{item.familiar}</td>
              <td>{item.prioridad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};