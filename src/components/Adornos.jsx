
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

const AdornosTable = () => {
  const [adornos, setAdornos] = useState([]);
  const tableRef = useRef(null); 

  useEffect(() => {
    const getAdornos = async () => {
      const q = query(collection(db, "adornos"), orderBy("cantidad"));
      const querySnapshot = await getDocs(q);
      setAdornos(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    getAdornos();
  }, []);


  const handleExportPdf = () => {
    const headers = ["Adorno", "Cantidad"];
    
    const data = adornos.map(adorno => [
      adorno.nombre,
      adorno.cantidad
    ]);

    exportToPdf("Reporte de Adornos", headers, data, "reporte_adornos");
  };

  const handleExportExcel = () => {
    const dataForExcel = adornos.map(({ id, ...rest }) => rest);
    exportToExcel(dataForExcel, "Lista Adornos", "reporte_adornos");
  };

  const handleExportPng = () => {
    exportToPng(tableRef, "reporte_adornos");
  };


  return (
    <motion.div 
      className="container p-4 my-5 shadow bg-light rounded"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    > 
      <h3 className="text-center mb-4">🎄 Tabla de Adornos</h3>
      
      <div ref={tableRef}>
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Adorno</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          
          <motion.tbody
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {adornos.map(adorno => (
              <motion.tr key={adorno.id} variants={itemVariants}>
                <td>{adorno.nombre}</td>
                <td>
                  <span className="badge bg-primary">{adorno.cantidad}</span>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>

      <motion.div 
        className="d-flex justify-content-end mt-3"
        initial="hidden"
        animate="visible"
        variants={buttonContainerVariants}
      >
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
      </motion.div>
    </motion.div>
  );
};

export default AdornosTable;