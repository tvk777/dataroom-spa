import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useDataRoom } from '@/context/DataRoomContext';

export const UploadFileButton = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { uploadFile } = useDataRoom();

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed.');
      return;
    }

    await uploadFile(file);

    event.target.value = '';
  };

  return (
    <>
      <Button onClick={handleButtonClick}>Upload PDF</Button>

      <input ref={inputRef} type='file' accept='.pdf,application/pdf' className='hidden' onChange={handleFileChange} />
    </>
  );
};
