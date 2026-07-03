import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useDataRoom } from '@/context/DataRoomContext';

function App() {
  const { currentFolders, createFolder, navigateToFolder } = useDataRoom();
  const [folderName, setFolderName] = useState('');

  const handleCreateFolder = () => {
    if (!folderName.trim()) return;

    createFolder(folderName);
    setFolderName('');
  };

  return (
    <div className='min-h-screen bg-slate-50 p-8'>
      <div className='mx-auto max-w-5xl'>
        <h1 className='mb-8 text-3xl font-bold'>Acme Data Room</h1>

        <div className='mb-8 flex gap-3'>
          <input
            className='rounded-md border px-3 py-2'
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder='Folder name'
          />

          <Button onClick={handleCreateFolder}>Create Folder</Button>
        </div>

        <div className='grid gap-4 md:grid-cols-3'>
          {currentFolders.map((folder) => (
            <div
              key={folder.id}
              onClick={() => navigateToFolder(folder.id)}
              className='cursor-pointer rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md'
            >
              📁 {folder.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
