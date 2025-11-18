import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

import { motion } from 'framer-motion'; 

import { exportToPdf } from '../utils/exportToPdf'; 
import { exportToExcel } from '../utils/exportToExcel';
import { exportToPng } from '../utils/exportToPng'; 
import 'jspdf-autotable';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05, 
        },
    },
};

const buttonContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5, 
      staggerChildren: 0.1,
    },
  },
};

const buttonItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

const RegalosTable = () => {
  const [regalos, setRegalos] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    const getRegalos = async () => {
      const q = query(collection(db, "regalos"), orderBy("prioridad")); 
      
      const querySnapshot = await getDocs(q);
      setRegalos(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    getRegalos();
  }, []);


  const handleExportPdf = () => {
    const headers = ["Nombre Regalo", "Familiar", "Prioridad"];
    const data = regalos.map(regalo => [
      regalo.nombre,
      regalo.familiar,
      regalo.prioridad
    ]);
    exportToPdf("Reporte de Regalos", headers, data, "reporte_regalos");
  };

  const handleExportExcel = () => {
    const dataForExcel = regalos.map(({ id, ...rest }) => rest);
    exportToExcel(dataForExcel, "Lista Regalos", "reporte_regalos");
  };

  const handleExportPng = () => {
    exportToPng(tableRef, "reporte_regalos");
  };
  
  return (
    <motion.div 
      className="container p-4 my-5 shadow bg-light rounded"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    > 
      <h3 className="text-center mb-4">🎁 Tabla de Regalos</h3>
      
      <div ref={tableRef}>
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Nombre Regalo</th>
              <th>Familiar</th>
              <th>Prioridad</th>
            </tr>
          </thead>
          
          <motion.tbody
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {regalos.map(regalo => (
              <motion.tr key={regalo.id} variants={itemVariants}>
                <td>{regalo.nombre}</td>
                <td>{regalo.familiar}</td>
                <td>
                  <span className={`badge ${regalo.prioridad === 1 ? 'bg-danger' : regalo.prioridad === 2 ? 'bg-warning text-dark' : 'bg-success'}`}>
                    {regalo.prioridad}
                  </span>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>

      <div className="d-flex justify-content-end mt-3" 
        initial="hidden"
        animate="visible"
        variants={buttonContainerVariants}>
        <motion.button 
          className="btn btn-sm btn-outline-danger me-2" 
          onClick={handleExportPdf}
          variants={buttonItemVariants} 
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(220, 53, 69, 0.8)" }} 
          whileTap={{ scale: 0.95 }} 
        >
          Exportar PDF
        </motion.button>
        
        <motion.button 
          className="btn btn-sm btn-outline-success me-2" 
          onClick={handleExportExcel}
          variants={buttonItemVariants}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(40, 167, 69, 0.8)" }}
          whileTap={{ scale: 0.95 }}
        >
          Exportar Excel
        </motion.button>
        
        <motion.button 
          className="btn btn-sm btn-outline-info me-2" 
          onClick={handleExportPng}
          variants={buttonItemVariants}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(23, 162, 184, 0.8)" }}
          whileTap={{ scale: 0.95 }}
        >
          Exportar PNG
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RegalosTable;