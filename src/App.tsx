import { FolderOpen } from 'lucide-react';
import { useDataRoom } from '@/context/DataRoomContext';
import { FolderCard } from '@/components/folders/FolderCard';
import { CreateFolderDialog } from '@/components/folders/CreateFolderDialog';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { UploadFileButton } from '@/components/files/UploadFileButton';
import { FileCard } from '@/components/files/FileCard';
import { openFile } from '@/lib/file-utils';
import { LoadingScreen } from '@/components/layout/LoadingScreen';

function App() {
  const { currentFolders, currentFiles, navigateToFolder, isDataLoaded } = useDataRoom();

  if (!isDataLoaded) {
    return <LoadingScreen />;
  }

  return (
    <div className='min-h-screen bg-slate-50 p-8'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-8 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <FolderOpen className='h-8 w-8 text-primary' />

            <h1 className='text-3xl font-bold'>Acme Data Room</h1>
          </div>
          <div className='flex gap-3'>
            <UploadFileButton />
            <CreateFolderDialog />
          </div>
        </div>

        <Breadcrumbs />

        {currentFolders.length === 0 && currentFiles.length === 0 ? (
          <div className='rounded-xl border border-dashed bg-white py-20 text-center'>
            <p className='text-lg font-medium'>Empty Data Room</p>

            <p className='text-slate-500'>Upload files or create folders</p>
          </div>
        ) : (
          <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
            {currentFolders.map((folder) => (
              <FolderCard key={folder.id} folder={folder} onClick={() => navigateToFolder(folder.id)} />
            ))}

            {currentFiles.map((file) => (
              <FileCard key={file.id} file={file} onClick={() => openFile(file.file)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
