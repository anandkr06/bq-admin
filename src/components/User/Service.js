import axios from 'axios';
import Setting from '../../dev-setting/dev-config';

class Service {
      
    createUser(obj, loginUserObject){
        
        return axios.post(`${Setting.restApi.url}bq/v1/user/create`,
           
              obj,
          
        //   {
        //     headers: { 'Content-Type': 'application/json' }
        //   }

          {
            headers: {
                token: loginUserObject.loginUser.token.access_token,
                scope: 'Create-User'
            } 
        }
      );
    }

    updateUser(obj, loginUserObject){
        
        return axios.put(`${Setting.restApi.url}bq/v1/user/update/${obj.userId}`,
           
              obj,
              {
              headers: {
                token: loginUserObject.loginUser.token.access_token,
                scope: 'Dashboard'
              }
            } 
          
        //   {
        //     headers: { 'Content-Type': 'application/json' }
        //   }
      );
    }

    getCelebrityList(loginUserObject){
        return axios.get(`${Setting.restApi.url}bq/v1/celebs/fetch/`,
         {
              headers: {
                token: loginUserObject.loginUser.token.access_token,
                scope: 'Dashboard'
              }
            }
      );
    }

    getAllLocaleList(loginUserObject){
        return axios.get(`${Setting.restApi.url}bq/v1/lang/fetch/`, 
        {
              headers: {
                token: loginUserObject.loginUser.token.access_token,
                scope: 'Dashboard'
              }
            }
      );
    }

    getAllUserList(loginUserObject){
        return axios.get(`${Setting.restApi.url}bq/v1/user/fetch/`,
         {
            headers: {
                token: loginUserObject.loginUser.token.access_token,
                scope: 'View-User'
                } 
            }
    //     return   new Promise((resolve, reject) => resolve(
    //      [{
    //         "userId": 111,
    //         "fstNme": "Brijesh",
    //         "lstNme": "Singh",
    //         "email": "Brijesh@Singh.com",
    //         "mapCelebs": [{
    //                 "celebId": 97,
    //                 "celebNme": "Alaa Dashti Boutique"
    //             },
    //             {
    //                 "celebId": 98,
    //                 "celebNme": "Zori Boutique"
    //             }
    //         ],
    //         "role": 1,
    //         "createdBy": 1,
    //         "createdAt": "2018-02-27T15:25:14+05:30",
    //         "updatedBy": 1,
    //         "updatedAt": "2018-02-27T15:25:14+05:30",
    //         "languagePref": {
    //             "langId": 1,
    //             "i18Lang": "English",
    //             "locale": "avchavd"
    //         },
    //         "status": 1
    //     },
    //     {
    //         "userId": 9,
    //         "fstNme": "Kaushal",
    //         "lstNme": "Singh",
    //         "email": "Kaushal@test.com",
    //         "mapCelebs": [{
    //                 "celebId": 97,
    //                 "celebNme": "Alaa Dashti Boutique"
    //             },
    //             {
    //                 "celebId": 98,
    //                 "celebNme": "Zori Boutique"
    //             }
    //         ],
    //         "role": 1,
    //         "createdBy": 1,
    //         "createdAt": "2018-02-27T15:25:14+05:30",
    //         "updatedBy": 1,
    //         "updatedAt": "2018-02-27T15:25:14+05:30",
    //         "languagePref": {
    //             "langId": 1,
    //             "i18Lang": "English",
    //             "locale": "avchavd"
    //         },
    //         "status": 1
    //     },
    //     {
    //         "userId": 5,
    //         "fstNme": "Suresh",
    //         "lstNme": "Singh",
    //         "email": "suresh@test.com",
    //         "mapCelebs": [{
    //                 "celebId": 97,
    //                 "celebNme": "Alaa Dashti Boutique"
    //             },
    //             {
    //                 "celebId": 98,
    //                 "celebNme": "Zori Boutique"
    //             }
    //         ],
    //         "role": 1,
    //         "createdBy": 1,
    //         "createdAt": "2018-02-27T15:25:14+05:30",
    //         "updatedBy": 1,
    //         "updatedAt": "2018-02-27T15:25:14+05:30",
    //         "languagePref": {
    //             "langId": 1,
    //             "i18Lang": "English",
    //             "locale": "avchavd"
    //         },
    //         "status": 1
    //     },
    //     {
    //         "userId": 12,
    //         "fstNme": "ramesh",
    //         "lstNme": "Singh",
    //         "email": "ramesh@test.com",
    //         "mapCelebs": [{
    //                 "celebId": 97,
    //                 "celebNme": "Alaa Dashti Boutique"
    //             },
    //             {
    //                 "celebId": 98,
    //                 "celebNme": "Zori Boutique"
    //             }
    //         ],
    //         "role": 1,
    //         "createdBy": 1,
    //         "createdAt": "2018-02-27T15:25:14+05:30",
    //         "updatedBy": 1,
    //         "updatedAt": "2018-02-27T15:25:14+05:30",
    //         "languagePref": {
    //             "langId": 1,
    //             "i18Lang": "English",
    //             "locale": "avchavd"
    //         },
    //         "status": 1
    //     },
    //     {
    //         "userId": 2,
    //         "fstNme": "suresh",
    //         "lstNme": "bhaati",
    //         "email": "suresh@test.com",
    //         "mapCelebs": [{
    //                 "celebId": 97,
    //                 "celebNme": "Alaa Dashti Boutique"
    //             },
    //             {
    //                 "celebId": 98,
    //                 "celebNme": "Zori Boutique"
    //             }
    //         ],
    //         "role": 1,
    //         "createdBy": 1,
    //         "createdAt": "2018-02-27T15:25:14+05:30",
    //         "updatedBy": 1,
    //         "updatedAt": "2018-02-27T15:25:14+05:30",
    //         "languagePref": {
    //             "langId": 1,
    //             "i18Lang": "English",
    //             "locale": "avchavd"
    //         },
    //         "status": 1
    //     }]
    // ));
        )}

            getAllRoleList(loginUserObject){
                 return axios.get(`${Setting.restApi.url}bq/v1/role/fetch/`,
                 {
                    headers: {
                    token: loginUserObject.loginUser.token.access_token,
                    scope: 'Fetch-Roles'
                    } 
                 }
                )
            }
            //      return   new Promise((resolve, reject) => resolve(
            //         [{
            //             "roleId": 2,
            //             "roleNme": "Sub-superviser",
            //             "store": [{
            //                     "cntryId": 1,
            //                     "cntryNme": "Kuwait",
            //                     "children": [{
            //                         "storeId": 1,
            //                         "storeNme": "Main Website store"
            //                     }]
            //                 },
            //                 {
            //                     "cntryId": 2,
            //                     "cntryNme": "Qatar",
            //                     "children": [{
            //                         "storeId": 2,
            //                         "storeNme": "Qatar Main Website Store"
            //                     }]
            //                 }
            //             ],
            //             "privilege": [{
            //                     "privilId": 1,
            //                     "privilNme": "Dashboard",
            //                     "subHeading": "Permissions",
            //                     "refUrl": "/dashboard",
            //                     "children": []
            //                 },
            //                 {
            //                     "privilId": 2,
            //                     "privilNme": "System",
            //                     "subHeading": "Permissions",
            //                     "refUrl": "/system",
            //                     "children": [{
            //                             "privilId": 3,
            //                             "privilNme": "Create Roles",
            //                             "subHeading": "Create role",
            //                             "refUrl": "/system/createRole",
            //                             "children": []
            //                         },
            //                         {
            //                             "privilId": 4,
            //                             "privilNme": "Fetch Roles",
            //                             "subHeading": "View all roles",
            //                             "refUrl": "/system/viewRole",
            //                             "children": []
            //                         },
            //                         {
            //                             "privilId": 6,
            //                             "privilNme": "Create User",
            //                             "subHeading": "",
            //                             "refUrl": "/system/createUser",
            //                             "children": []
            //                         },
            //                         {
            //                             "privilId": 7,
            //                             "privilNme": "View User",
            //                             "subHeading": "",
            //                             "refUrl": "/system/viewUser",
            //                             "children": []
            //                         }
            //                     ]
            //                 }
            //             ]
            //         },
            //         {
            //             "roleId": 3,
            //             "roleNme": "admin",
            //             "store": [{
            //                 "cntryNme": "",
            //                 "children": [{
            //                     "storeId": -1
            //                 }]
            //             }],
            //             "privilege": [{
            //                 "privilNme": "",
            //                 "subHeading": "",
            //                 "refUrl": "",
            //                 "children": [{
            //                     "privilId": -1,
            //                     "privilNme": "",
            //                     "subHeading": "",
            //                     "refUrl": "",
            //                     "children": null
            //                 }]
            //             }]
            //         }
            //     ]
            // ))
            
}
export default Service; 