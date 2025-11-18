import html2canvas from 'html2canvas';

export const exportToPng = (elementRef, filename) => {
  if (elementRef.current) {
    html2canvas(elementRef.current, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${filename}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
};