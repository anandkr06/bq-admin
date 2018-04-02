import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './navigation.css';

//import containers
import UserProfile from './components/user-profile/user-profile';
import Menu from './components/menu/menu';

class Navigation extends Component {
    constructor(props){
        super(props);
        this.signOut = this.signOut.bind(this);
    }

    signOut(e){
        console.log('logging out with props',this.props);
        this.props.history.push('/');
    }

    render(){
        return (
            <div className="col-lg-2 sidebar col-md-3">
                <UserProfile />
                <Menu url={this.props.url}/>
                <button  className="signout" onClick={this.signOut}>Sign Out</button>
            </div>
        )
    }
}



export default connect()(Navigation);
