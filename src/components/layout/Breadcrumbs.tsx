import { ChevronRight, House } from 'lucide-react';
import { useDataRoom } from '@/context/DataRoomContext';

export const Breadcrumbs = () => {
  const { breadcrumbs, navigateToFolder } = useDataRoom();

  return (
    <div className='mb-6 flex flex-wrap items-center gap-2 text-sm'>
      <button
        onClick={() => navigateToFolder(null)}
        className='flex cursor-pointer items-center gap-1 text-slate-500 transition-colors hover:text-slate-900'
      >
        <House className='h-4 w-4' />
        <span>Data Room</span>
      </button>

      {breadcrumbs.map((folder, index) => {
        const isCurrent = index === breadcrumbs.length - 1;

        return (
          <div key={folder.id} className='flex items-center gap-2'>
            <ChevronRight className='h-4 w-4 text-slate-400' />

            {isCurrent ? (
              <span className='font-semibold text-slate-900'>{folder.name}</span>
            ) : (
              <button
                onClick={() => navigateToFolder(folder.id)}
                className='cursor-pointer text-slate-500 transition-colors hover:text-slate-900 hover:underline'
              >
                {folder.name}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};
