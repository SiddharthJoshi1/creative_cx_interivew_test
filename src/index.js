import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './index.css';
import App from './component/App';
import reportWebVitals from './reportWebVitals';

import { OptimizelyProvider, createInstance  } from '@optimizely/react-sdk'
import {getUserId} from './utils'

const optimizely = createInstance({
  sdkKey: 'DfCR4rPWJ6GJBafgddRJi'
});
console.log('______ optimizely', optimizely);
const userID = getUserId();

ReactDOM.render(
  <React.StrictMode>
  
    <OptimizelyProvider optimizely={optimizely}
  			user={{id: userID}}>
   <Router>
    <App />
    </Router>
    </OptimizelyProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
