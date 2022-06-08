import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import App from './App';
import { MessageContext } from './contexts/MessageContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    autoHideDuration={3000}
  >
    <React.StrictMode>
      <BrowserRouter>
        <MessageContext>
          <App />
        </MessageContext>
      </BrowserRouter>
    </React.StrictMode>
  </SnackbarProvider>
)

