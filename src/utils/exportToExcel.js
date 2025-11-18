import * as XLSX from 'xlsx';

export const exportToExcel = (jsonData, sheetName, filename) => {
  const ws = XLSX.utils.json_to_sheet(jsonData);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  XLSX.writeFile(wb, `${filename}.xlsx`);
};