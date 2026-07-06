import { useMemo, useState, type ReactNode } from 'react';
import { DataRoomContext } from './DataRoomContext';
import type { FileItem, Folder } from '@/types/dataroom';
import { getBreadcrumbs, getDescendantFolderIds } from '@/lib/folder-utils';
import { isFileNameDuplicate, isFolderNameDuplicate } from '@/lib/validation';

interface DataRoomProviderProps {
  children: ReactNode;
}

export const DataRoomProvider = ({ children }: DataRoomProviderProps) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);

  const currentFolders = useMemo(
    () => folders.filter((folder) => folder.parentId === currentFolderId),
    [folders, currentFolderId],
  );

  const currentFiles = useMemo(
    () => files.filter((file) => file.folderId === currentFolderId),
    [files, currentFolderId],
  );

  const breadcrumbs = useMemo(() => getBreadcrumbs(currentFolderId, folders), [currentFolderId, folders]);

  const navigateToFolder = (folderId: string | null) => {
    setCurrentFolderId(folderId);
  };

  const createFolder = (name: string) => {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    if (isFolderNameDuplicate(folders, currentFolderId, trimmedName)) {
      return;
    }

    const newFolder: Folder = {
      id: crypto.randomUUID(),
      name: trimmedName,
      parentId: currentFolderId,
      createdAt: new Date().toISOString(),
    };

    setFolders((prev) => [...prev, newFolder]);
  };

  const renameFolder = (id: string, newName: string) => {
    const trimmedName = newName.trim();

    if (!trimmedName) return;

    const folder = folders.find((folder) => folder.id === id);

    if (!folder) return;

    if (isFolderNameDuplicate(folders, folder.parentId, trimmedName, id)) {
      return;
    }

    setFolders((prev) => prev.map((folder) => (folder.id === id ? { ...folder, name: trimmedName } : folder)));
  };

  const deleteFolder = (id: string) => {
    setFolders((prev) => {
      const idsToDelete = getDescendantFolderIds(id, prev);

      if (currentFolderId && idsToDelete.includes(currentFolderId)) {
        navigateToFolder(null);
      }

      return prev.filter((folder) => !idsToDelete.includes(folder.id));
    });
  };

  const uploadFile = (file: File) => {
    const trimmedName = file.name.trim();

    if (isFileNameDuplicate(files, currentFolderId, trimmedName)) {
      return;
    }
    const newFile: FileItem = {
      id: crypto.randomUUID(),
      name: file.name,
      folderId: currentFolderId,
      file,
      size: file.size,
      createdAt: new Date().toISOString(),
    };

    setFiles((prev) => [...prev, newFile]);
  };

  const renameFile = (id: string, newName: string) => {
    const trimmedName = newName.trim();

    if (!trimmedName) return;

    setFiles((prev) =>
      prev.map((file) =>
        file.id === id
          ? {
              ...file,
              name: newName,
            }
          : file,
      ),
    );
  };

  const deleteFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  return (
    <DataRoomContext.Provider
      value={{
        folders,
        files,
        currentFolderId,

        currentFolders,
        currentFiles,

        breadcrumbs,

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
