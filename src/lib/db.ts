import { openDB } from 'idb';

export const STORES = {
  folders: 'folders',
  files: 'files',
} as const;

export const dbPromise = openDB('data-room-db', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORES.folders)) {
      db.createObjectStore(STORES.folders);
    }

    if (!db.objectStoreNames.contains(STORES.files)) {
      db.createObjectStore(STORES.files);
    }
  },
});
