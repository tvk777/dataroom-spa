import { useMemo, useState, type ReactNode } from 'react';
import { DataRoomContext } from './DataRoomContext';
import type { FileItem, Folder } from '@/types/dataroom';


interface DataRoomProviderProps {
  children: ReactNode;
}

export const DataRoomProvider = ({ children }: DataRoomProviderProps) => {
  const [folders, /* setFolders */] = useState<Folder[]>([]);
  const [files, /* setFiles */] = useState<FileItem[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);

  const currentFolders = useMemo(
    () => folders.filter((folder) => folder.parentId === currentFolderId),
    [folders, currentFolderId],
  );

  const currentFiles = useMemo(
    () => files.filter((file) => file.folderId === currentFolderId),
    [files, currentFolderId],
  );

  const navigateToFolder = (folderId: string | null) => {
    setCurrentFolderId(folderId);
  };

  const createFolder = () => {};
  const renameFolder = () => {};
  const deleteFolder = () => {};

  const uploadFile = () => {};
  const renameFile = () => {};
  const deleteFile = () => {};

  return (
    <DataRoomContext.Provider
      value={{
        folders,
        files,
        currentFolderId,

        currentFolders,
        currentFiles,

        navigateToFolder,

        createFolder,
        renameFolder,
        deleteFolder,

        uploadFile,
        renameFile,
        deleteFile, 
      }}
    >
      {children}
    </DataRoomContext.Provider>
  );
};
