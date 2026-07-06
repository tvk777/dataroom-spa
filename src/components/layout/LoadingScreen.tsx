import { Loader2 } from 'lucide-react';

export const LoadingScreen = () => (
  <div className='flex h-screen flex-col items-center justify-center gap-5'>
    <Loader2 className='h-10 w-10 animate-spin text-primary' />

    <p className='text-sm text-muted-foreground'>Loading...</p>
  </div>
);
