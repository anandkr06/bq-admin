import React, {Component} from 'react';
import ReactTable from 'react-table';
import {DropdownList} from 'react-widgets';
import { reduxForm, Field} from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllRoleListAction } from '../action/UserAction';

class UserRole extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        let roleData = [];
        this.props.fetchAllRoleListAction();
    }

    render(){
		let data = [];
		for (let i = 0; i < this.props.allRoleList.length; i++){
			let roleId = this.props.allRoleList[i].roleId;
			let roleName = this.props.allRoleList[i].roleNme;
    		data.push({["label"] : roleName, ["val"] : roleId});
        }
        return(
            <li className="nav-item">
                    <a className="nav-link">User Role</a>
                    <Field
                        placeholder = "Select Role"
						textField = {"label"}
						valueField = {"val"}
                        name="role"
                        component={renderDropdownList}
                        data={data}
                        validate = {required}
                        />
                </li>   
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ 
        fetchAllRoleListAction
}, dispatch)
}

const mapStateToProps = (state) => {
  return {
	  allRoleList  : state.allRoleList.allRoleList,
      initialValues : state.editFormData.editFormData
  };
}




UserRole = reduxForm({
        form: 'userRole',
        destroyOnUnmount : false,
        keepDirtyOnReinitialize  : true,
        enableReinitialize: true,
        onSubmit: (data, dispatch, props) => {
            !data.userId && dispatch(createUserAction(data));
            data.userId && dispatch(updateUserAction(data));
        }
    })(UserRole)

    UserRole = connect(mapStateToProps, mapDispatchToProps)(UserRole);
    export default UserRole;



const renderDropdownList = ({ input, data, valueField, textField, placeholder,  meta: { touched, error, warning }
         }) =>
                (<div>
                <DropdownList {...input}
                    data={data}
                    valueField={valueField}
                    textField={textField}
                    placeholder={placeholder || null} />
                    {touched &&
                    ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
                </div>
                );
const required = value => (value ? undefined : 'Required')
