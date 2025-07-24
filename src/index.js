import React from 'react';
import ReactDOM from 'react-dom/client';
// Updated path to styles folder
import './styles/index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);