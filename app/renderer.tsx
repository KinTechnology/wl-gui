import React from 'react'
import ReactDOM from 'react-dom/client'
import appIcon from '@/resources/build/icon.png'
import { ErrorBoundary } from './components/ErrorBoundary'
import App from './app'
import './styles/globals.css'
import { StoreProvider } from './store'
import { PromptProvider } from './components/prompt'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <StoreProvider>
        <PromptProvider>
          <App />
        </PromptProvider>
      </StoreProvider>
    </ErrorBoundary>
  </React.StrictMode>
)
