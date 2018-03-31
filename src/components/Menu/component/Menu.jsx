import React from 'react';
import render from 'react-dom';
import '../styles/Menu.css';
import Header from '../../Header/component/Header.jsx';
import {withRouter, Switch, Route, Link } from 'react-router-dom';

//redux and react-redux.
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//include actions 
import { setActiveView } from '../action/menu-list-action';

//import components for actions on menu.
import UserForm from '../../User/component/UserForm.jsx';   // include create user form 
import UserRole from '../../User/component/UserRole.jsx';  // include create user role assign form
import RoleInfo from '../../Roles/component/RoleInfoForm.jsx'; // include create role form 
import RoleResources  from '../../Roles/component/RoleResourcesForm.jsx'; // include create role resources form

// include view all roles.
import RolesRecordGrid from '../../Roles/component/ViewRole.jsx';

//import user grid
import ViewUser from '../../User/component/ViewUser.jsx';

class Navigation extends React.Component {

    constructor(props){
        super(props);
        let keyWord = props.match.params.topicId.search('User') === -1 ? 'roleInfo' :  'userForm';
        props.setActiveView(keyWord);
    }

    componentDidMount(){
        if(document.getElementsByClassName("option-list").length)
            {
                document.getElementsByClassName("option-list")[0].click();
            }
    }

    renderList() {
        let arrayModel = this.props.match.params.topicId.search('User') === -1 ? this.props.roleOptions : this.props.userOptions;     
        return arrayModel.map(
            (option) => {
                return (
                    option.isHeading ?
                    <li className = "parent-heading" key = {option.heading}>{option.title}</li>
                    :
                    <li className = "option-heading" key={option.title}><Link className = "option-list" to = {option.title.split(" ").join("")}>{option.title}</Link>
                    </li>
                );
            }
        );
    }

    render() {
        if(this.props.match.params.topicId !== 'viewRole' && this.props.match.params.topicId !== 'viewUser'){
         let title = (this.props.match.params.topicId.indexOf('User') !== -1) ? 'User' : 'Role';
            return (
                <div className="row">
                    <Header title = {title} history={this.props.history} />
                    <div className="col-3"><ul className="nav md-pills pills-primary flex-column parent-container">
                        {this.renderList()}
                    </ul></div>
                    <Route path='/home/system/UserInfo' component={UserForm}/>
                    <Route path='/home/system/UserRole' component={UserRole}/>
                    <Route path='/home/system/RoleInfo' component={RoleInfo}/>
                    {/* <Route path='/home/system/RoleResources' component={RoleResources}/> */}
                </div>
            );
        }else if(this.props.match.params.topicId === 'viewRole') {
        return ( <RolesRecordGrid url = {this.props} /> )
        }else if(this.props.match.params.topicId === 'viewUser') {
        return ( <ViewUser url = {this.props}/> )
        } 
    }
    }

function mapStateToProps(state) {
  return {
      userOptions: state.userOptions,
      roleOptions: state.roleOptions
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setActiveView }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Navigation);
