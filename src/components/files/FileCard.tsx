import type { FileItem } from '@/types/dataroom';
import { FileActions } from './FileActions';

interface FileCardProps {
  file: FileItem;
  onClick: () => void;
}

export const FileCard = ({ file, onClick }: FileCardProps) => {
  return (
    <div className='rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md'>
      <div className='flex items-start justify-between gap-4'>
        <div onClick={onClick} className='flex-1 min-w-0 cursor-pointer group'>
          <div className='mb-2 text-3xl transition-transform group-hover:scale-105'>📄</div>

          <p title={file.name} className='truncate font-medium text-slate-800'>
            {file.name}
          </p>

          <p className='mt-2 text-sm text-slate-500'>{(file.file.size / 1024).toFixed(1)} KB</p>

          <p className='text-xs text-slate-400 opacity-0 transition-opacity group-hover:opacity-100'>
            Click to preview
          </p>
        </div>

        <FileActions file={file} />
      </div>
    </div>
  );
};
