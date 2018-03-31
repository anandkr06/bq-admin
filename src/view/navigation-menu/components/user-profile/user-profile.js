import React, { Component } from 'react';
import { connect } from 'react-redux';
import './user-profile.css'

const UserProfile = props => {
    return (
       <div id="user-profile" className="py-4">
       <div className="logo text-center pb-4"><img src={"../../../../src/images/dashboard-logo.png"} alt="logo" /></div>
           <div className="user">UserProfile Pic</div>
           <span className="name">{props.userLoginName}</span>
           <span className="mailid">{props.userLoginId}</span>
        </div>
    )
}

const mapStateToProps = state => ({
    userLoginId : state.userLoginInfo.loginUser.email,
    userLoginName : state.userLoginInfo.loginUser.name
});

export default connect(mapStateToProps)(UserProfile);

