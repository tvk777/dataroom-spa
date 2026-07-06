import { useRef } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useDataRoom } from '@/context/DataRoomContext';

export const UploadFileButton = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { uploadFile } = useDataRoom();

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

    if (!isPdf) {
      toast.error('Only PDF files are allowed.');

      event.target.value = '';

      return;
    }

    const success = uploadFile(file);

    if (!success) {
      toast.error(`"${file.name}" already exists in this folder.`);
    }

    event.target.value = '';
  };

  return (
    <>
      <Button onClick={handleButtonClick}>Upload PDF</Button>

      <input ref={inputRef} type='file' accept='.pdf,application/pdf' className='hidden' onChange={handleFileChange} />
    </>
  );
};
