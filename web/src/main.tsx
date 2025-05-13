import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/sonner';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <App />
        <Toaster richColors />
      </ThemeProvider>
    </StrictMode>,
  );
} else {
  throw new Error("Root element with id 'root' not found");
}
