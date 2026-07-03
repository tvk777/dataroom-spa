import type { Folder } from '@/types/dataroom';

export const getDescendantFolderIds = (folderId: string, folders: Folder[]): string[] => {
  const children = folders.filter((folder) => folder.parentId === folderId);

  let ids = [folderId];

  children.forEach((child) => {
    ids = [...ids, ...getDescendantFolderIds(child.id, folders)];
  });

  return ids;
};

export const getBreadcrumbs = (currentFolderId: string | null, folders: Folder[]): Folder[] => {
  if (!currentFolderId) return [];

  const path: Folder[] = [];
  let current = folders.find((folder) => folder.id === currentFolderId);

  while (current) {
    path.unshift(current);

    current = folders.find((folder) => folder.id === current?.parentId);
  }

  return path;
};