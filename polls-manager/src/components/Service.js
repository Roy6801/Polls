import axios from "axios";

const API_BASE_URL = "http://192.168.1.204:5000/";

const login = async (user) => {
  return axios.post(API_BASE_URL + "LoginUser", { ...user });
};

const register = async (user) => {
  return axios.post(API_BASE_URL + "RegisterUser", { ...user });
};

const getPassword = (user) => {
  const { userName, password } = user;
  axios
    .get(API_BASE_URL + { userName } + "/GetPassword", {
      userName: userName,
      password: password,
    })
    .then((response) => {
      console.log(response.status);
    })
    .catch((error) => console.error(error));
};

const updateUserName = (userName) => {
  axios
    .put(API_BASE_URL + { userName } + "/UpdateUserName", {
      userName: userName,
    })
    .then((response) => {
      console.log(response.status);
    })
    .catch((error) => console.error(error));
};

const updatePassword = (userName, password) => {
  axios
    .put(API_BASE_URL + { userName } + "/UpdatePassword", {
      userName: userName,
      password: password,
    })
    .then((response) => {
      console.log(response.status);
    })
    .catch((error) => console.error(error));
};


export default {
  login,
  register,
  getPassword,
  updateUserName,
  updatePassword,
};