import React, { Component } from 'react';
import { reduxForm, Field, reset} from 'redux-form';
import axios from 'axios';
import {Multiselect, DropdownList} from 'react-widgets';
import { createUserAction, fetchCelebrityListAction, fetchAllLocaleListAction, editUserFormAction, updateUserAction, fetchAllRoleListAction } from '../action/UserAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//import form utilities
import Alert from '../../../utilities/alert/Alert';
import Loader from '../../../utilities/loader/Loader';

class UserForm extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        // this.props.editUserFormAction([{
        //         "createdBy" : undefined,
        //         "email" : undefined,
        //         "fstNme" : undefined,
        //         "languagePref" : undefined,
        //         "lstNme" : undefined,
        //         "mapCelebs" : undefined,
        //         "role" : undefined,
        //         "status" : undefined,
        //         "updatedAt" : undefined,
        //         "updatedBy" : undefined
        //         }
        //     ]);
        (this.props.location.state) && this.props.editUserFormAction(this.props.location.state.data);
        this.props.fetchCelebrityListAction();
        this.props.fetchAllLocaleListAction();
        this.props.fetchAllRoleListAction();
    }

    render(){
        let data = [];
		for (let i = 0; i < this.props.allRoleList.length; i++){
			let roleId = this.props.allRoleList[i].roleId;
			let roleName = this.props.allRoleList[i].roleNme;
    		data.push({["label"] : roleName, ["val"] : roleId});
        }
        const { handleSubmit } = this.props 

        return(
            <div className="col-9 tab-content">
                <Alert />
                <h4>Account Information</h4>
                <hr/>
            <form onSubmit={handleSubmit}>
                <Field name = "fstNme" label = "First Name" className = "form-control" type = "text" component={renderField}
                 validate = {[required, isAlphabet]}/>
               <Field name = "lstNme" label = "Last Name" className = "form-control" type = "text" component={renderField}
                 validate = {[required, isAlphabet]}  />
               <Field name = "email" type = "email" className = "form-control" label = "Email" component={renderField}
                 validate = {[required, isValidEmail]} disabled = {!(this.props.initialValues instanceof Array || typeof this.props.initialValues === 'undefined')}    />        
                {(this.props.initialValues instanceof Array || typeof this.props.initialValues === 'undefined') ? 
                    (<div>
                <Field name = "pwd" type = "password" className = "form-control" label = "Password" component={renderField}
                 validate = {[required, maxLength15, minLength6]} />        
                <Field name = "passwordConfirm" type = "password" className = "form-control" label = "Confirm Password" component={renderField}
                    validate={[required, maxLength15, minLength6,doPasswordMatch]}/> 
                    </div>)
                : ('')}
                {/* <div>
                     <label className="col-3">Map Celebrity</label> */}
                     <Field
                        placeholder = "Select Celebrity"
                        name="mapCelebs"
                        component={renderMultiselect}
                        valueField='celebId'
                        textField='celebNme'
                        data={this.props.celebrityList}
                        className = "col-9"
                        label = "Map Celebrity"
                        />
                {/* </div>            */}
                {/* <div>
                    <label className="col-3">Interface Locale</label>
                    <div> */}
                    <Field
                        placeholder = "Select Locale"
                        name="languagePref"
                        valueField='langId'
                        textField='i18Lang'
                        component={renderDropdownList}
                        data={this.props.allLocaleList}
                        validate = {required}
                        className = "col-9"
                        label = "Interface Locale"
                        />
                    {/* </div>
                </div> */}
                {/* <div>
                    <label className="col-3">This Account is</label>
                    <div> */}
                    <Field
                        placeholder = "Select Account Status"
                        name="status"
                        valueField='id'
                        textField='text'
                        component={renderDropdownList}
                        data={accountStatus}
                        validate = {required}
                        className = "col-9"
                        label = "This Account is"
                        />
                    {/* </div>
                </div> */}
                {/* <div>
                    <label className="col-4">User Role</label>
                    <div> */}
                    <Field
                        placeholder = "Select Role"
						textField = {"label"}
						valueField = {"val"}
                        name="role"
                        component={renderDropdownList}
                        data={data}
                        validate = {required}
                        className = "col-9"
                        label = "User Role"
                        />
                    {/* </div>
                </div> */}
            </form>
            {/* <div>
                <label>Current User Identity Verification</label>                    
                    <Field name = "userPassword" type = "password" label = "Your Password" component={renderField}
                    /> 
                </div> */}
                <Loader />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    createUserAction, 
    fetchCelebrityListAction, 
    fetchAllLocaleListAction, 
    editUserFormAction,
    updateUserAction,
    fetchAllRoleListAction
}, dispatch)
}

const mapStateToProps = (state) => {
  return {
      celebrityList : state.celebrityList.celebrityList,
      allLocaleList : state.allLocaleList.allLocaleList,
      initialValues : state.editFormData.editFormData,
      allRoleList  : state.allRoleList.allRoleList
  };
}




UserForm = reduxForm({
        form: 'userForm',
        destroyOnUnmount : true,
        keepDirtyOnReinitialize: false,
        enableReinitialize: true,
        onSubmit: (data, dispatch, props) => {
            !data.userId && dispatch(createUserAction(data));
            data.userId && dispatch(updateUserAction(data));
            props.editUserFormAction([{
                "createdBy" : undefined,
                "email" : undefined,
                "fstNme" : undefined,
                "languagePref" : undefined,
                "lstNme" : undefined,
                "mapCelebs" : undefined,
                "role" : undefined,
                "status" : undefined,
                "updatedAt" : undefined,
                "updatedBy" : undefined
                }
            ]);
        }
    })(UserForm)

    UserForm = connect(mapStateToProps, mapDispatchToProps)(UserForm);
    export default UserForm;

        const required = value => (value ? undefined : 'Required')
        const isValidEmail = value =>
            value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ? 'Invalid email address'
            : undefined
        const isAlphabet = (value) =>
            value && /[^a-zA-Z]/i.test(value)
            ? 'Only alphabets characters are allowed!!!'
            : undefined
        
        const doPasswordMatch = (fieldValue, allFieldValues) =>
        (fieldValue != allFieldValues.pwd) 
        ? 'Password and confirm password does not match!!!'
        : undefined    

        //check for max length field
            const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
            const maxLength15 = maxLength(15);

            //check for minlength field.
            export const minLength = min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined
            export const minLength6 = minLength(6);
            
        const renderField = ({
            input,
            label,
            type,
            style,
            disabled,
            className,
            meta: { touched, error, warning }
            }) => (
            <div className="form-group row" style = {style}>
                <label className = "col-3">{label}</label>
                <div className = "col-9">
                <input {...input} className = {className} placeholder={label} type={type} style = {style} disabled = {disabled}/>
                {touched &&
                    ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
                </div>
            </div>
        );

        const renderMultiselect = ({ input, data, valueField, textField, placeholder, className, label }) =>
        <div className="form-group row">
                <label className = "col-3">{label}</label>
            <Multiselect {...input}
                onBlur={() => input.onBlur()}
                value={input.value || []} // requires value to be an array
                data={data}
                valueField={valueField}
                textField={textField}
                placeholder = {placeholder}
                className = {className}
            />
            </div>
        
        const renderDropdownList = ({ input, data, valueField, textField, placeholder, className, label,  meta: { touched, error, warning }
         }) =>
                (<div className="form-group row">
                <label className = "col-3">{label}</label>
                <DropdownList {...input}
                    data={data}
                    valueField={valueField}
                    textField={textField}
                    className = {className}
                    placeholder={placeholder || null} />
                    {touched &&
                    ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
                </div>
                );

        const  accountStatus = [
            {
                "id":1,
                "text": "Active"
            },
            {
                "id":0,
                "text": "Inactive"
            }
        ];
