export function brandHeader() {
    // return authorization header with jwt token
    let brand = JSON.parse(localStorage.getItem('brand'));

    if (brand && brand.token) {
        return { 'Authorization': 'Bearer ' + brand.token };
    } else {
        return {};
    }
}