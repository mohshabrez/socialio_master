import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
// import {makeServer} from "./server"
import reportWebVitals from './reportWebVitals';
import { MediaProvider } from './Context/MediaContext';
import { AuthProvider } from './Context/AuthContext';
import { BookProvider } from './Context/BookContext';


const root = ReactDOM.createRoot(document.getElementById('root'));

// makeServer();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MediaProvider>
          <BookProvider>
           <App />
          </BookProvider>
        </MediaProvider>
      </AuthProvider>
    </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();