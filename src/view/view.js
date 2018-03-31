import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//import helping components
import Loader from '../utilities/loader/Loader';
import Header from '../view/header/components/Header';
import Navigation from './navigation-menu/Navigation';
import Screen from './screen/Screen';

//import for routings
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Dashboard from './screen/Dashboard/Dashboard';
// import PreviledgeMenu from '../components/PreviledgeMenu/component/PreviledgeMenu.jsx'


//import actions
import { setHeader } from './header/action/header-action';

import './view.css';

class View extends React.Component {
    constructor(props){
        super(props);
        props.setHeaderTitle('Dashboard');
    }

    render(){
        return (
            <div className="container-fluid">
                <div className="row">                   
                        <Navigation url = {this.props.match.url} history={this.props.history}/>    
                    <div className="col-10 offset-2 main px-0"> 
                        <Header/>
                        <Screen url = {this.props.match.url}/> 
                    </div>
                <Loader></Loader>
                </div>
            </div>
          )
    }
}

const mapStateToProps = state => {
    return {
      userProfile : state.userLoginInfo.loginUser,
      navigationMenu : state.userLoginInfo.navigationMenu
     }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    setHeaderTitle : setHeader
  }, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(View)