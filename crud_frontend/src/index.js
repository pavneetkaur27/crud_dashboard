import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./store/storeConfig";
// import Dashboard from './components/Dashboard';
import Form from './components/ReactJsonFormBuilder/Form';
import { Route, BrowserRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

// include css
import './css/index.css';



ReactDOM.render(

    <Provider store={store}>
        <BrowserRouter>
            <Route exact path="/" component={Form} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();