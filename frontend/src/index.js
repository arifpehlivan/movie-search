import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Movies from './components/Movies';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Movies/>
  </React.StrictMode>
);


