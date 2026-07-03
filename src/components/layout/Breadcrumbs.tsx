import { useDataRoom } from '@/context/DataRoomContext';

export const Breadcrumbs = () => {
  const { breadcrumbs, navigateToFolder } = useDataRoom();

  return (
    <div className='mb-6 flex flex-wrap items-center gap-2 text-sm'>
      <button onClick={() => navigateToFolder(null)} className='text-slate-500 hover:text-slate-900'>
        Data Room
      </button>

      {breadcrumbs.map((folder) => (
        <div key={folder.id} className='flex items-center gap-2'>
          <span className='text-slate-400'>/</span>

          <button onClick={() => navigateToFolder(folder.id)} className='text-slate-500 hover:text-slate-900'>
            {folder.name}
          </button>
        </div>
      ))}
    </div>
  );
};
