import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalStyles } from './Styles/GlobalStyle.js';
import Home from './Containers/Home/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyles />
    <Home />
  </React.StrictMode>,
);
