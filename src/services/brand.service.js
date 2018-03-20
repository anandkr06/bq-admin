import { brandHeader } from '../helpers';

export const brandService = {
    addbrand,
    editbrand,
    deletebrand,
    getAll
};

function addbrand(brandname, description) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brandname, description })
    };

    return fetch('/brands/add', requestOptions)
        .then(response => {
            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(brand => {
            // brand successful if there's a jwt token in the response
            if (brand && brand.token) {
                // store brand details and jwt token in local storage to keep brand logged in between page refreshes
                localStorage.setItem('brand', JSON.stringify(brand));
            }

            return brand;
        });
}

function deletebrand() {
    // remove brand from local storage to log brand out
    //localStorage.removeItem('brand');
}
function editbrand() {
    // remove brand from local storage to log brand out
    //localStorage.removeItem('brand');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: brandHeader()
    };

    return fetch('/brands', requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}