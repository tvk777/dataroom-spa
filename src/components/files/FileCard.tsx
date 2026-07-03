import type { FileItem } from '@/types/dataroom';

interface FileCardProps {
  file: FileItem;
  onClick: () => void;
}

export const FileCard = ({ file, onClick }: FileCardProps) => {
  return (
    <div
      onClick={onClick}
      className='group relative cursor-pointer rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md'
    >
      <div className='mb-2 text-3xl'>📄</div>

      <p title={file.name} className='truncate font-medium text-slate-800'>
        {file.name}
      </p>

      <p className='mt-2 text-sm text-slate-500'>{(file.size / 1024).toFixed(1)} KB</p>

      <div
        className='
      pointer-events-none
      absolute inset-0
      flex items-center justify-center
      rounded-xl
      bg-slate-900/35 
      backdrop-blur-[1px]
      opacity-0
      transition-opacity
      duration-200
      group-hover:opacity-100
    '
      >
        <span className='text-sm font-medium text-white'>Click to preview</span>
      </div>
    </div>
  );
};
