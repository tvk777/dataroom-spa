export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
}

export interface FileItem {
  id: string;
  name: string;
  folderId: string | null;
  data: string; // base64 pdf
  size: number;
  createdAt: string;
}

export interface DataRoomState {
  folders: Folder[];
  files: FileItem[];
  currentFolderId: string | null;
}