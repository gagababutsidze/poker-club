import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { WebSocketProvider } from "./WS";
// Create root for React 18
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
   
        <BrowserRouter>
        <WebSocketProvider>
            <App />
            </WebSocketProvider>
        </BrowserRouter>

);
