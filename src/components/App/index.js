import React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from '../../store';

import './styles.css';

import Login from '../Login';

const { store, persistor } = configureStore();

const App = () => (
    <div className = "App">
        <Provider store = {store}>
            <Login/>             
        </Provider>
    </div>
);

export default App;
