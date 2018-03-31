import React, { Component } from 'react';
import { connect, dispatch } from 'react-redux';
import { combineReducers } from 'redux'
import { reset, submit } from 'redux-form';
import { editUserFormAction } from '../../User/action/UserAction';
import { editRoleForm } from "../../Roles/action/update-role-action";
import '../styles/header.css'


class Header extends Component {

    constructor(props) {
        super(props);
        this.resetForm = this.resetForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.routeBackToDashboard = this.routeBackToDashboard.bind(this);
    }

    resetForm(event) {
        event ? event.preventDefault() : '';
        this.props.reset(this.props.currentView);
        if(this.props.currentView === 'userForm') {
            this.props.editUserFormAction([]);
        }
        else{
            this.props.editRoleForm([]);
        }
    }

    submitForm(event) {
        event.preventDefault();
        this.props.submit(this.props.currentView);
    }

    routeBackToDashboard(e){
        e.preventDefault();
        this.resetForm();
        this.props.history.push('/home');
    }

    render() {
        return (
            <div className="col-12 py-4 text-right head-row mb-4">
                <button className="btn back-btn mr-4" onClick={this.routeBackToDashboard}><img />Back</button>
                <button className="btn btn-reset mx-4" onClick={this.resetForm}>Reset</button>
                <button className="btn btn-btq ml-4" onClick={this.submitForm}>Save {this.props.title}</button>
            </div>
        )
    }

}


function mapStateToProps(state) {
    return {
        userForm: state.form.userForm,
        roleForm: state.form.roleForm,
        currentView: state.activeViewInfo.activeViewObject
    };
};


export default connect(mapStateToProps, { reset, submit, editUserFormAction, editRoleForm })(Header);
