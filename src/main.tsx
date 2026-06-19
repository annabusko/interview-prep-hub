
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PreferencesProvider } from './app/providers/preferences/PreferencesProvider';
import { ContentPackProvider } from './content/ContentPackContext';
import { interviewPrepContentPack } from './content/interviewPrepContentPack';
import './i18n/i18n';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContentPackProvider pack={interviewPrepContentPack}>
      <PreferencesProvider>
        <App />
      </PreferencesProvider>
    </ContentPackProvider>
  </StrictMode>,
);
