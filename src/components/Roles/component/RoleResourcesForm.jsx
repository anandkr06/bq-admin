import React, { Component } from 'react';

//include redux-form
import { reduxForm, Field } from 'redux-form';

//include connection to redux 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//include nestedMultiSelect
import TreeComponent from './TreeComponent/component/TreeComponent.jsx';

//include actions
import { nestedResourcesData, nestedScopesData,hideScopeTreeComponent,hideResourcesTreeComponent } from '../../../redux/actions/index';

//import actions for update calls.
//import { hideScopeTreeComponent,hideResourcesTreeComponent } from '../../../redux/actions/rolesActions/update-role-action';


class RoleResources extends Component {
    constructor(props) {
        super(props);
        this.setScopeTree = this.setScopeTree.bind(this);
        this.state = {
            scopeTree: false,
            resourcesTree: false,
            isTreePopulatedResource: false,
            isTreePopulatedScope: false
        }
        this.setResourcesTree = this.setResourcesTree.bind(this);
        debugger;
    }

    componentDidMount() {
        this.props.nestedResourcesData();
        this.props.nestedScopesData();
    }

    checkTreeVisibilityAfterUpdate(){
        if (!this.state.isTreePopulatedResource && !this.state.isTreePopulatedScope) {
            if (document.getElementById('resourceAccess').value === 'All') {
                this.setState({
                    resourcesTree: false
                })
                this.setState({
                    isTreePopulatedResource: true
                })
            } else if (document.getElementById('resourceAccess').value === 'Custom') {
                this.setState({
                    resourcesTree: true
                })
                this.setState({
                    isTreePopulatedResource: true
                })
            };
            if (document.getElementById('roleScopes').value === 'All') {
                this.setState({
                    scopeTree: false
                })
                this.setState({
                    isTreePopulatedScope: true
                })
            } else if (document.getElementById('roleScopes').value === 'Custom') {
                this.setState({
                    scopeTree: true
                })
                this.setState({
                    isTreePopulatedScope: true
                })
            }
        }
    }

    componentDidUpdate() {
        this.checkTreeVisibilityAfterUpdate();
    }

    shouldComponentUpdate() {
        console.debug('shouldComponentUpdate');
        return true;
      }

    setScopeTree(e) {
        this.setState(
            (previousState, props) => {
                return { scopeTree: e.target.value === 'Custom' ? true : false }
            });
        if(e.target.value === 'Custom'){
            this.props.hideScopeTreeComponent(false);
        }else {
            this.props.hideScopeTreeComponent(true);
        }
    }

    setResourcesTree(e) {
        this.setState(
            (previousState, props) => {
                return { resourcesTree: e.target.value === 'Custom' ? true : false }
            });
            if(e.target.value === 'Custom'){
                this.props.hideResourcesTreeComponent(false);
            }else {
                this.props.hideResourcesTreeComponent(true);
            }
    }

    render() {
        return (
            <div className="container-fluid clearfix">
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
                        {
                            this.state.scopeTree && !this.props.hideScopeTree ? 
                           <div> 
                           { this.props.scopes.length > 0 ? 
                                <div>
                            <TreeComponent preSelectedData={this.props.scopeResourceData ? this.props.scopeResourceData.store : ''} data={this.props.scopes} responseFormat={responseFormat} responseKey={"store"} parentLabel={"cntryNme"} childLabel={"storeNme"} parentId={"cntryId"} childId={"storeId"}></TreeComponent>
                        </div> :  <span>No resources Found</span>
                           }
                       </div> : <span></span>
                       }
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
                                this.state.resourcesTree  && !this.props.hideResourcesTree?
                                    <div>
                                        <label>Resources</label>
                                        { this.props.resources.length > 0 ?
                                             <div>
                                                <TreeComponent preSelectedData={this.props.scopeResourceData ? this.props.scopeResourceData.privilege : ''} data={this.props.resources} responseFormat={responseFormat} responseKey={"privilege"} parentLabel={"privilNme"} childLabel={"privilNme"} parentId={"privilId"} childId={"privilId"}></TreeComponent>
                                             </div> : 
                                             <span>No resources Found</span>
                                        }
                                    </div> :
                                    <span></span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    resources: state.roleResources.roleResourcesData,
    scopes: state.roleScopes.roleScopeData,
    hideScopeTree: state.hideScopeTreeComponent.hideScopeTreeAfterUpdate,
    hideResourcesTree: state.hideResourcesTreeComponent.hideResourcesTreeAfterUpdate
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    nestedResourcesData, 
    nestedScopesData, 
    hideScopeTreeComponent, 
    hideResourcesTreeComponent
}, dispatch);

const responseFormat = {
    "store": [],
    "privilege": []
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleResources);


// export default reduxForm({
//     form: 'roleResources',
//     destroyOnUnmount: false,   // ??? why do we use it?
// })(RoleResources);


