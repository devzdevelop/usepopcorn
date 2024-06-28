import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import StarRating from './components/StarRating';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Test from './components/Test';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={5} messages={['Terrible', 'Bad', 'Ok', 'Good', 'Amazing']} defaultRating={3}/>
    <StarRating maxRating={5} size={30} color="#463DD9" className="test" />
    <Test /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
