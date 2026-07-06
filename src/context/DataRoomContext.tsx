import { createContext, useContext } from 'react';
import type { FileItem, Folder } from '@/types/dataroom';

interface DataRoomContextType {
  folders: Folder[];
  files: FileItem[];
  currentFolderId: string | null;

  currentFolders: Folder[];
  currentFiles: FileItem[];

  breadcrumbs: Folder[];

  navigateToFolder: (folderId: string | null) => void;

  createFolder: (name: string) => void;
  renameFolder: (id: string, newName: string) => void;
  deleteFolder: (id: string) => void;

  uploadFile: (file: File) => boolean;
  renameFile: (id: string, newName: string) => void;
  deleteFile: (id: string) => void;
}

export const DataRoomContext = createContext<DataRoomContextType | null>(null);

export const useDataRoom = () => {
  const context = useContext(DataRoomContext);

  if (!context) {
    throw new Error('useDataRoom must be used within DataRoomProvider');
  }

  return context;
};
