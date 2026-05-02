
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PreferencesProvider } from './app/providers/preferences/PreferencesProvider';
import './i18n/i18n';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PreferencesProvider>
      <App />
    </PreferencesProvider>
  </StrictMode>,
);
