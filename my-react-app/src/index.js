import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import LogIn from './LogIn';
import reportWebVitals from './reportWebVitals';
import Welcome from './Welcome';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Welcome />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
