import { AppProvider } from '@shopify/polaris';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider >
    <App />
  </AppProvider>

);


