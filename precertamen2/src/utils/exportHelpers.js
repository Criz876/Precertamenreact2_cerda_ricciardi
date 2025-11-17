import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';

// Exportar a Excel
export const exportToExcel = (data, fileName) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja1");
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

// Exportar a PDF
export const exportToPDF = (columns, data, title) => {
  const doc = new jsPDF();
  doc.text(title, 20, 10);
  const tableRows = data.map(item => Object.values(item));
  doc.autoTable({
    head: [columns],
    body: tableRows,
  });
  doc.save(`${title}.pdf`);
};

// Exportar a PNG (toma el ID de la tabla HTML)
export const exportToPNG = (elementId, fileName) => {
  const input = document.getElementById(elementId);
  if (input) {
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${fileName}.png`;
      link.click();
    });
  }
};