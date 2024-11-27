import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css'; // Asegúrate de que la ruta sea correcta
import App from './App.jsx'; // Asegúrate de que la ruta a App.jsx sea correcta

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Este id debe coincidir con el id en el archivo index.html
);