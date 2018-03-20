import { brandConstants } from '../constants';
import { brandService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const brandActions = {
    addbrand,
    editbrand,
    deletebrand,
    getAll
};

function addbrand(brandname, description) {
    return dispatch => {
        dispatch(request({ brandname }));

        brandService.addbrand(brandname, description)
            .then(
                brand => { 
                    dispatch(success(brand));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(brand) { return { type: brandConstants.BRAND_ADD_REQUEST, brand } }
    function success(brand) { return { type: brandConstants.BRAND_ADD_SUCCESS, brand } }
    function failure(error) { return { type: brandConstants.BRAND_ADD_FAILURE, error } }
}

function deletebrand() {
    brandService.deletebrand();
    return { type: brandConstants.BRAND_DELETE };
}
function editbrand(){
    
}

function getAll() {
    return dispatch => {
        dispatch(request());

        brandService.getAll()
            .then(
                brands => dispatch(success(brands)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: brandConstants.GETALL_REQUEST } }
    function success(brands) { return { type: brandConstants.GETALL_SUCCESS, brands } }
    function failure(error) { return { type: brandConstants.GETALL_FAILURE, error } }
}