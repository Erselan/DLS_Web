import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import * as serviceWorker from "./serviceWorker";
import { Provider } from 'react-redux';
import store from './main/store';
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);

reportWebVitals();
serviceWorker.register();