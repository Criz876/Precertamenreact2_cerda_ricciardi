import { jsPDF } from 'jspdf'; 
import 'jspdf-autotable'; 

export const exportToPdf = (title, headers, data, filename) => {
  const doc = new jsPDF(); 

  doc.setFontSize(18);
  doc.text(title, 14, 22);
  
  doc.autoTable({
    startY: 30,
    head: [headers],
    body: data,
    theme: 'striped',
    headStyles: { fillColor: [52, 58, 64] },
  });

  doc.save(`${filename}.pdf`);
};