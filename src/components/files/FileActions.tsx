import { useState } from 'react';

import { useDataRoom } from '@/context/DataRoomContext';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { FileItem } from '@/types/dataroom';
import { isFileNameDuplicate } from '@/lib/validation';
import { cn } from '@/lib/utils';

interface FileActionsProps {
  file: FileItem;
}

export const FileActions = ({ file }: FileActionsProps) => {
  const { id, name } = file;
  const { files, renameFile, deleteFile } = useDataRoom();

  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [newName, setNewName] = useState(name);

  const trimmedName = newName.trim();

  const error =
    trimmedName.length === 0
      ? 'File name is required.'
      : isFileNameDuplicate(files, file.folderId, trimmedName, file.id)
        ? 'A file with this name already exists.'
        : null;

  const handleRename = () => {
    const trimmedName = newName.trim();

    if (!trimmedName) return;

    renameFile(id, trimmedName);

    setIsRenameOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='sm'>
            ⋮
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            onClick={() => {
              setNewName(name);
              setIsRenameOpen(true);
            }}
          >
            Rename
          </DropdownMenuItem>

          <DropdownMenuItem
            className='text-red-600'
            onClick={(e) => {
              e.preventDefault();
              setIsDeleteOpen(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename File</DialogTitle>
          </DialogHeader>

          <div className='space-y-4'>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className={cn(error && 'border-red-500 focus-visible:ring-red-500')}
            />
            {error && <p className='mt-2 text-sm text-red-500'>{error}</p>}
            <Button className='w-full' onClick={handleRename} disabled={!!error}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete file?</AlertDialogTitle>

            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction className='bg-red-600 hover:bg-red-700' onClick={() => deleteFile(id)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
