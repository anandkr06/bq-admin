import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { render } from 'react-dom';


//components
import Login from './src/components/LoginScreen/component/Login.jsx';
import View from './src/view/view';


//react and redux related library
import { Provider } from 'react-redux';
import store, { history } from './src/redux/store/index';

//redux router related libaray 
// import { ConnectedRouter } from 'react-router-redux';

import 'react-widgets/dist/css/react-widgets.css';
import 'react-table/react-table.css';

// import 'bootstrap/dist/css/bootstrap.min.css';

class Main extends Component {
    render() {
        return (
            <div>
               
                <Route exact path='/' component={Login} />
                <Route path='/home' component={View} />
            </div>
        );
    }
}

let rootElement = document.getElementById('app')

render(
    <Provider store={store}>
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    </Provider>
    ,
    rootElement
)
  