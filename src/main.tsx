import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import './index.css';
import App from './App.tsx';
import { DataRoomProvider } from './context/DataRoomProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataRoomProvider>
      <App />
      <Toaster richColors position='top-right' />
    </DataRoomProvider>
  </StrictMode>,
);
