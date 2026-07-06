import type { FileItem, Folder } from '@/types/dataroom';

const getNormalizedName = (name: string) => name.trim().toLowerCase();

export const isFolderNameDuplicate = (
  folders: Folder[],
  parentId: string | null,
  name: string,
  excludeId?: string,
): boolean => {
  const normalizedName = getNormalizedName(name);

  return folders.some(
    (folder) =>
      folder.parentId === parentId && folder.id !== excludeId && getNormalizedName(folder.name) === normalizedName,
  );
};

export const isFileNameDuplicate = (
  files: FileItem[],
  parentId: string | null,
  name: string,
  excludeId?: string,
): boolean => {
  const normalizedName = getNormalizedName(name);

  return files.some(
    (file) => file.folderId === parentId && file.id !== excludeId && getNormalizedName(file.name) === normalizedName,
  );
};