import axios from 'axios';
import Setting from '../../dev-setting/dev-config';

class LoginApiService {
    constructor(){
        if (!LoginApiService.instance) {
            LoginApiService.instance = this;
        }
        return LoginApiService.instance;
    }

      
    getLogin(obj){
        obj.useremail = obj.useremail.toString();
        return axios.post(`${Setting.loginApi.url}bq/v1/login`, { email : obj.useremail , password : obj.password }); 
        //return axios.get(`${Setting.dev2.url}bq/v1/privil/fetch/`)
        // return  new Promise((resolve,reject) => {
        //     resolve(
        //         {
        //             "status": {
        //                 "httpStatusCode": 200,
        //                 "success": true,
        //                 "errors": null
        //             },
        //             "data": {
        //                 "userId": 11,
        //                 "email": "Ram@gmail.com",
        //                 "fstNme": "rameshwar",
        //                 "lstNme": "singh",
        //                 "languagePref": "English",
        //                 "token": {
        //                     "access_token": "W3Sx4KvF3mAhBOtcYV4PyVAsk3VKld75w6869KFMweY.Ofk1rGXaE1lWqqHpQuz_lrHDGQdGWi3LWCIK9p8rD6o",
        //                     "token_type": "bearer",
        //                     "expiry": "2018-03-21T04:22:23.317530901+05:30"
        //                 },
        //                 "privilege": [
        //                     {
        //                         "privilId": 1,
        //                         "privilNme": "Dashboard",
        //                         "subHeading": "Permissions",
        //                         "refUrl": "/dashboard",
        //                         "children": []
        //                     },
        //                     {
        //                         "privilId": 2,
        //                         "privilNme": "System",
        //                         "subHeading": "Permissions",
        //                         "refUrl": "/system",
        //                         "children": [
        //                             {
        //                                 "privilId": 3,
        //                                 "privilNme": "Create Roles",
        //                                 "subHeading": "Create role",
        //                                 "refUrl": "/system/createRole",
        //                                 "children": []
        //                             },
        //                             {
        //                                 "privilId": 4,
        //                                 "privilNme": "Fetch Roles",
        //                                 "subHeading": "View all roles",
        //                                 "refUrl": "/system/viewRole",
        //                                 "children": []
        //                             },
        //                             {
        //                                 "privilId": 6,
        //                                 "privilNme": "Create User",
        //                                 "subHeading": "",
        //                                 "refUrl": "/system/createUser",
        //                                 "children": []
        //                             },
        //                             {
        //                                 "privilId": 7,
        //                                 "privilNme": "View User",
        //                                 "subHeading": "",
        //                                 "refUrl": "/system/viewUser",
        //                                 "children": []
        //                             }
        //                         ]
        //                     },
        //                     {
        //                         "privilId": 8,
        //                         "privilNme": "Sales",
        //                         "subHeading": "Sales page",
        //                         "refUrl": "/sales",
        //                         "children": []
        //                     },
        //                     {
        //                         "privilId": 9,
        //                         "privilNme": "Product",
        //                         "subHeading": "Product page",
        //                         "refUrl": "/prodict",
        //                         "children": []
        //                     }
        //                 ]
        //             },
        //             "_metaData": {
        //                 "urlParams": {},
        //                 "apiMetaData": {}
        //             }
        //         }
        //     );
        // });
      }

}
const instance = new LoginApiService();
Object.freeze(instance);

export default instance; 