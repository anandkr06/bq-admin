import { combineReducers } from 'redux';
import {reducer as formReducer } from 'redux-form';
import { loginReducer } from '../components/LoginScreen/reducer/login-reducer';
import { loaderReducer } from '../utilities/loader/reducer/loader-reducer';
import { headerReducer } from '../view/header/reducer/header-action-reducer';
import { createUserReducer, getCelebrityListReducer, getAllUserListReducer, getViewUserColumnsReducer, getAllLocaleListReducer, loadEditUserDataReducer, fetchAllRoleListReducer } from '../components/User/reducer/UserReducer';
import {  userMenuOptionReducer , roleMenuOptionReducer } from './screenMenuOptions';
import { activeViewReducer } from '../components/Menu/reducer/menu-list-reducer';
import { 
    roleResourcesReducer,
    roleScopesReducer,
    selectedRoleScopesReducer,
    selectedRoleResourcesReducer
 } from '../components/Roles/reducer/create-role-reducer';

 import { roleRecordsReducer } from '../components/Roles/reducer/view-roles-reducer';
 import {
    setEditRoleFormReducer,
    updateRoleReducer,
    hideScopeTreeComponentReducer,
    hideResourcesTreeComponentReducer
 } from '../components/Roles/reducer/update-role-reducer';

 import {
    alertReducer
 } from '../utilities/alert/reducer/alert-reducer';

 import {checkedOptionsReducer} from '../components/Roles/component/TreeComponent/reducer/tree-reducer';

const integratedReducer = combineReducers({
   userOptions : userMenuOptionReducer,
   roleOptions : roleMenuOptionReducer,
   activeViewInfo : activeViewReducer,
   roleResources : roleResourcesReducer,
   roleScopes : roleScopesReducer,
   selectedRoleScopes : selectedRoleScopesReducer,
   selectedRoleResources : selectedRoleResourcesReducer,
   allRoleRecords : roleRecordsReducer,
   setRoleForm : setEditRoleFormReducer,
   updateRole  : updateRoleReducer,
   alertState : alertReducer,
   form : formReducer,
   userLoginInfo : loginReducer,
   loader : loaderReducer,
   header: headerReducer,
   createUserReducer : createUserReducer,
   celebrityList : getCelebrityListReducer,
   allUserList : getAllUserListReducer,
   viewUserColumns : getViewUserColumnsReducer,
   allLocaleList : getAllLocaleListReducer,
   editFormData : loadEditUserDataReducer,
   checkedOptions : checkedOptionsReducer,
   allRoleList : fetchAllRoleListReducer,
   hideScopeTreeComponent:hideScopeTreeComponentReducer,
   hideResourcesTreeComponent:hideResourcesTreeComponentReducer
});
export default integratedReducer;