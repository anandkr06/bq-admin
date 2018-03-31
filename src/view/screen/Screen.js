import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import './Screen.css';
import Navigation from '../../components/Menu/component/Menu.jsx';
import ViewUser from '../../components/User/component/ViewUser.jsx';
import Dashboard from './Dashboard/Dashboard';


class Screen extends Component {

  render() {
    return (
        <div>
          <div className="col pt-3">
                <Switch>
                    <Route path={`${this.props.url}/system/:topicId`} component={Navigation}/>
                    <Route path={`${this.props.url}`} component={Dashboard}/>
                </Switch>
            </div>
        </div>
    );
  }
}

export default withRouter(Screen);