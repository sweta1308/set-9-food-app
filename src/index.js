import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { FoodProvider } from './context/FoodContext';
import { CartProvider } from './context/CartContext';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FoodProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FoodProvider>
    </BrowserRouter>
  </React.StrictMode>
);

