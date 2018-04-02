import React, { Component } from 'react';

//include redux-form
import { reduxForm, Field, reset } from 'redux-form';

//include connection to redux 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//check for required field
const required = value => (value ? undefined : 'Required');

//check for max length field with 256 character limit.
const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength256 = maxLength(256);

//check for max length field with 15 character limit.
const maxLength15 = maxLength(15);

//check for minlength field with 6 character limit.
export const minLength = min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength6 = minLength(6);

//check for alphabet type check.
const isAlphabet = (value) => value && /[^a-zA-Z\s]/i.test(value) ? 'Only alphanumeric characters' : undefined;

//import actions for create calls
import { createRoleInfoAction, 
    initAction,
    editRoleForm, 
    updateRoleAction,
    hideScopeTreeComponent,
    hideResourcesTreeComponent } from "../../../redux/actions/index";
//import actions for update calls.
//import { editRoleForm, updateRoleAction,hideScopeTreeComponent,hideResourcesTreeComponent } from '../../../redux/actions/rolesActions/update-role-action';
//forms role segment 
import RoleResources from './RoleResourcesForm.jsx';

// //include actions
// import { nestedResourcesData, nestedScopesData } from '../../../redux/actions/rolesActions/create-role-action';

// //include nestedMultiSelect
// import TreeComponent from './TreeComponent/component/TreeComponent.jsx';

//import form utilities
import Alert from '../../../utilities/alert/Alert';
import Loader from '../../../utilities/loader/Loader';

const renderField = ({
    input,
    label,
    type,
    className,
    meta: { touched, error, warning }
            }) => (
        <div className="form-group row">
            <label className="col-3">{label}</label>
            <div className="col-9 md-input-wrapper">
                <input {...input} placeholder={label} type={type} className={className} />
                {
                    touched &&
                    (
                        (error && <span>{error}</span>) || (warning && <span>{warning}</span>)
                    )
                }
            </div>
        </div>
    );


class RoleInfo extends Component {
    constructor(props) {
        super(props);
        console.log('roleinfo props', props);
    }

    componentDidMount() {
        this.props.editRoleForm([]);
        (this.props.location.state) && this.props.editRoleForm(this.props.location.state.data);
        // this.props.nestedResourcesData();
        // this.props.nestedScopesData();
    }

    render() {
        let scopeResourceData;
        if (this.props.location.state) {
            scopeResourceData = this.props.location.state.data;
        }
        const { handleSubmit, pristine, submitting } = this.props;
        return (
            <div className="col-9">
                <Alert />
                <h4>Role Information</h4><hr />
                <form onSubmit={handleSubmit} >
                    <Field name="roleName" type="text"
                        label="Role Information*"
                        component={renderField}
                        validate={[required, isAlphabet, maxLength256]}
                        className="form-control"
                        label="Interface Locale" />
                    {/* <div>
                        <label>Current User Identity Verification</label>
                        <Field name="userPassword" type="password" id='password'
                            label="Your Password *"
                            component={renderField}
                            validate={[required, maxLength15, minLength6]} />
                    </div> */}
                    <div className="row">
                        <RoleResources scopeResourceData = {scopeResourceData}/>
                        {/* <div className="container-fluid clearfix">
                            <h4 className="mt-4">Role Scope</h4>
                            <hr className="clearfix" />
                            <div className="col-12 px-0">
                                <div className="form-group row">
                                    <label className="col-3">Role Scopes</label>
                                    <div className="col-9">
                                        <Field name="roleScopes"
                                            component="select"
                                            className="form-control"
                                            onChange={this.setScopeTree}
                                            id='roleScopes'
                                        >
                                            <option value="All">All</option>
                                            <option value="Custom">Custom</option>
                                        </Field>
                                    </div>
                                    {this.state.scopeTree ? <div>
                                        <TreeComponent preSelectedData={scopeResourceData ? scopeResourceData.store : ''} data={this.props.scopes} responseFormat={responseFormat} responseKey={"store"} parentLabel={"cntryNme"} childLabel={"storeNme"} parentId={"cntryId"} childId={"storeId"}></TreeComponent>
                                    </div> : <span></span>}
                                </div>

                                <div className="clearfix">
                                    <h4 className="mt-4">Role Resources</h4>
                                    <hr />
                                    <div className="form-group row">
                                        <label className="col-3">Resource Access</label>
                                        <div className="col-9">
                                            <Field name="resourceAccess"
                                                component="select"
                                                className="form-control"
                                                onChange={this.setResourcesTree}
                                                id='resourceAccess'
                                            >
                                                <option value="All">All</option>
                                                <option value="Custom">Custom</option>
                                            </Field>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            this.state.resourcesTree ?
                                                <div>
                                                    <label>Resources</label>
                                                    {this.props.resources.length > 0 ?
                                                        <div>
                                                            <TreeComponent preSelectedData={scopeResourceData ? scopeResourceData.privilege : ''} data={this.props.resources} responseFormat={responseFormat} responseKey={"privilege"} parentLabel={"privilNme"} childLabel={"privilNme"} parentId={"privilId"} childId={"privilId"}></TreeComponent>
                                                        </div> :
                                                        <span>No resources Found</span>
                                                    }
                                                </div> :
                                                <span></span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </form>
                <Loader />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    initialValues: state.setRoleForm.editRoleFormData
    // ,
    // resources: state.roleResources.roleResourcesData,
    // scopes: state.roleScopes.roleScopeData
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    createRoleInfoAction,
    initAction,
    editRoleForm,
    hideScopeTreeComponent,
    hideResourcesTreeComponent
    // ,
    // updateRoleAction,
    // nestedResourcesData, nestedScopesData
}, dispatch);


RoleInfo = reduxForm({
    form: 'roleInfo',
    destroyOnUnmount: false,
    keepDirtyOnReinitialize: false,
    enableReinitialize: true,
    onSubmit: (data, dispatch, props) => {
        !data.roleId && dispatch(createRoleInfoAction(data));
        data.roleId && dispatch(updateRoleAction(data)) && dispatch(hideResourcesTreeComponent(false)) && dispatch(hideScopeTreeComponent(false));
        // dispatch(reset('roleInfo'));
    }
})(RoleInfo);

RoleInfo = connect(mapStateToProps, mapDispatchToProps)(RoleInfo);

export default RoleInfo;