let BASIC_URL = "http://localhost:3000";

let api = {
    userSignUp:BASIC_URL+"/user/signup",
    userLogin:BASIC_URL+"/user/login",
    
    productCreate:BASIC_URL+"/product/create",
    getOneProduct:BASIC_URL+"/product",
    getAllProduct:BASIC_URL+"/product",
    deleteOneProduct:BASIC_URL+"/product",
    updateneProduct:BASIC_URL+"/product",
}
export default api;