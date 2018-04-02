import axios from 'axios';

const localApiUrl="http://54.245.24.99:8080/";
const stagingApiUrl="http://54.245.24.99:8080/";
const liveApiUrl="http://54.245.24.99:8080/";
const url=localApiUrl;

class ApiService {
    constructor() {
        if (!ApiService.instance) {
            ApiService.instance = this;
        }
        return ApiService.instance;
    }

    api(params, apiName, method, headerData) {
        console.log("Request :>>>>> " + JSON.stringify(params))
        console.log("Api :>>>>> " + apiName)
        console.log("Method :>>>>> " + method)
        if (method == "POST") {
            return axios.post(url + apiName, params);
        }

        if (method == "PUT") {
            return axios.put(url + apiName, params, { headers: { headerData } });
        }

        if (method == "GET") {
            return axios.get(url + apiName, {}, { headers: { headerData } });
        }
    }

}
const instance = new ApiService();
Object.freeze(instance);

export default instance;