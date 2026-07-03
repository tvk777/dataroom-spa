import { useDataRoom } from '@/context/DataRoomContext';
import { FolderCard } from '@/components/folders/FolderCard';
import { CreateFolderDialog } from '@/components/folders/CreateFolderDialog';
import { Breadcrumbs } from './components/layout/Breadcrumbs';

function App() {
  const { currentFolders, navigateToFolder } = useDataRoom();

  return (
    <div className='min-h-screen bg-slate-50 p-8'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-8 flex items-center justify-between'>
          <h1 className='text-3xl font-bold'>Acme Data Room</h1>

          <CreateFolderDialog />
        </div>

        <Breadcrumbs />

        {currentFolders.length === 0 ? (
          <div className='rounded-xl border border-dashed bg-white py-20 text-center'>
            <p className='text-lg font-medium'>No folders yet</p>
            <p className='text-slate-500'>Create your first folder</p>
          </div>
        ) : (
          <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
            {currentFolders.map((folder) => (
              <FolderCard
                key={folder.id}
                id={folder.id}
                name={folder.name}
                onClick={() => navigateToFolder(folder.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
