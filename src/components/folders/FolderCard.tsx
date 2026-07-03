import { FolderActions } from './FolderActions';

interface FolderCardProps {
  id: string;
  name: string;
  onClick: () => void;
}

export const FolderCard = ({ id, name, onClick }: FolderCardProps) => {
  return (
    <div className='rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md'>
      <div className='flex items-start justify-between gap-4'>
        <div onClick={onClick} className='cursor-pointer flex-1 min-w-0'>
          <div className='mb-2 text-3xl'>📁</div>

          <p className='font-medium text-slate-800 truncate'>{name}</p>
        </div>

        <FolderActions id={id} name={name} />
      </div>
    </div>
  );
};
