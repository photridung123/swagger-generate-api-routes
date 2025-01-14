import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import App from './App';

const rootElement = document.getElementById('app')!;
const root = ReactDOM.createRoot(rootElement); // Create root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
