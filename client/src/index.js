import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {store, persistor} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import {HelmetProvider} from "react-helmet-async";

ReactDOM.render(
    <HelmetProvider>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </HelmetProvider>
  ,
  document.getElementById('root')
);