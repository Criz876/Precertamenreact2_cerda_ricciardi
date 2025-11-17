import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { exportToExcel, exportToPDF, exportToPNG } from '../utils/exportHelpers';

export const TablaAdornos = () => {
  const [adornos, setAdornos] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const data = await getDocs(collection(db, "adornos"));
      const lista = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      
      // ORDENAMIENTO: Cantidad menor primero
      const listaOrdenada = lista.sort((a, b) => a.cantidad - b.cantidad);
      setAdornos(listaOrdenada);
    };
    obtenerDatos();
  }, []);

  const handlePDF = () => {
    const dataClean = adornos.map(a => ({ Adorno: a.nombre, Cantidad: a.cantidad }));
    exportToPDF(['Adorno', 'Cantidad'], dataClean, 'Lista_Adornos');
  };

  return (
    <div className="tabla-container">
      <h2>🎄 Adornos (Cantidad Menor)</h2>
      <div className="btn-group">
        <button className="btn btn-primary" onClick={handlePDF}>PDF</button>
        <button className="btn btn-success" onClick={() => exportToExcel(adornos, 'Adornos')}>Excel</button>
        <button className="btn btn-warning" onClick={() => exportToPNG('tabla-adornos', 'Adornos')}>PNG</button>
      </div>

      <table id="tabla-adornos" className="custom-table">
        <thead>
          <tr>
            <th>Nombre Adorno</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {adornos.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>{item.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};