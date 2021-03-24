import axios from "axios";

const API_BASE_URL = "http://192.168.1.204:5000/";

const login = (user) => {
  axios
    .post(API_BASE_URL + "LoginUser", { ...user })
    .then((resp) => {
      console.log(resp.status);
      if (resp.status != 200) {
        alert("Some error occurred!!");
      } else {
        axios
          .get(API_BASE_URL + "LoginUser")
          .then((resp) => resp)
          .then((data) => {
            console.log(data);
          })
          .catch((error) => console.error(error));
      }
    })
    .catch((error) => console.error(error));
};

const register = (user) => {
  axios
    .post(API_BASE_URL + "RegisterUser", { ...user })
    .then((resp) => {
      console.log(resp.status);
      if (resp.status != 200) {
        alert("Some error occurred!!");
      } else {
        axios
          .get(API_BASE_URL + "RegisterUser")
          .then((resp) => resp)
          .then((data) => {
            console.log(data);
          })
          .catch((error) => console.error(error));
      }
    })
    .catch((error) => console.error(error));
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