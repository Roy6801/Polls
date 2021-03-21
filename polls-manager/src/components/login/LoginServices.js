import axios from 'axios';

const Login_API_BASE_URL = "http://localhost:8080/api/Login";

class LoginServices {

    // getUserById(userName) {
    //     return axios.get(Login_API_BASE_URL  + '/' + userName);
    // }

    // updatePassword(userName, password) {
    //     return axios.put(Login_API_BASE_URL  + '/' + userName, password);
    // }
    login(userName, password) {
        return axios.post(Login_API_BASE_URL  + '/' + userName+ '/'+password);
    }
}

export default new LoginServices()
