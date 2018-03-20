import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './helpers';
import { App } from './App';

// setup fake backend
import { configureFakeBackend, configureFakeBrand } from './helpers';
configureFakeBackend();
configureFakeBrand();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);