import type { FileItem, Folder } from '@/types/dataroom';

import { dbPromise, STORES } from '@/lib/db';

const FOLDERS_KEY = 'folders';
const FILES_KEY = 'files';

export const loadFolders = async (): Promise<Folder[]> => {
  const db = await dbPromise;

  return (await db.get(STORES.folders, FOLDERS_KEY)) ?? [];
};

export const saveFolders = async (folders: Folder[]): Promise<void> => {
  const db = await dbPromise;

  await db.put(STORES.folders, folders, FOLDERS_KEY);
};

export const loadFiles = async (): Promise<FileItem[]> => {
  const db = await dbPromise;

  return (await db.get(STORES.files, FILES_KEY)) ?? [];
};

export const saveFiles = async (files: FileItem[]): Promise<void> => {
  const db = await dbPromise;

  await db.put(STORES.files, files, FILES_KEY);
};
