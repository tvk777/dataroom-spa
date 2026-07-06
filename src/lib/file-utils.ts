export const openFile = (file: File) => {
  const url = URL.createObjectURL(file);

  window.open(url, '_blank', 'noopener,noreferrer');
};
