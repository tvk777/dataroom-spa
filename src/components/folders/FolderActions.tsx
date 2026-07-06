import { useState } from 'react';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
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
import type { Folder } from '@/types/dataroom';
import { isFolderNameDuplicate } from '@/lib/validation';
import { cn } from '@/lib/utils';

interface FolderActionsProps {
  folder: Folder;
}


export const FolderActions = ({ folder }: FolderActionsProps) => {
  const { id, name, parentId } = folder;

  const { folders, deleteFolder, renameFolder } = useDataRoom();

  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [newName, setNewName] = useState(name);
  const trimmedName = newName.trim();

  const error =
    trimmedName.length === 0
      ? 'Folder name is required.'
      : isFolderNameDuplicate(folders, parentId, trimmedName, id)
        ? 'A folder with this name already exists.'
        : null;

  const handleRename = () => {
    const trimmedName = newName.trim();

    if (!trimmedName) return;

    renameFolder(id, trimmedName);
    setIsRenameOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='sm'>
            <MoreVertical className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            onClick={() => {
              setNewName(name);
              setIsRenameOpen(true);
            }}
          >
            <Pencil className='mr-2 h-4 w-4' />
            Rename
          </DropdownMenuItem>

          <DropdownMenuItem
            className='text-red-600'
            onClick={(e) => {
              e.preventDefault();
              setIsDeleteOpen(true);
            }}
          >
            <Trash2 className='mr-2 h-4 w-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Folder</DialogTitle>
          </DialogHeader>

          <div className='space-y-4'>
            <Input
              autoFocus
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
            <AlertDialogTitle>Delete folder?</AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. All nested folders and files will be deleted permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction className='bg-red-600 hover:bg-red-700' onClick={() => deleteFolder(id)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
