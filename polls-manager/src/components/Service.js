import axios from "axios";

const API_BASE_URL = "http://192.168.1.204:5000/";

class Service {
  login(user) {
    console.log({ ...user });
    axios
      .post(API_BASE_URL + "LoginUser", { ...user })
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) => console.error(error));
  }

  register(user) {
    console.log({ ...user });
    axios
      .post(API_BASE_URL + "RegisterUser", { ...user })
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) => console.error(error));
  }

  getPassword(userName, password) {
    axios
      .get(API_BASE_URL + { userName } + "/GetPassword", {
        userName: userName,
        password: password,
      })
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) => console.error(error));
  }

  updateUserName(userName) {
    axios
      .put(API_BASE_URL + { userName } + "/UpdateUserName", {
        userName: userName,
      })
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) => console.error(error));
  }

  updatePassword(userName, password) {
    axios
      .put(API_BASE_URL + { userName } + "/UpdatePassword", {
        userName: userName,
        password: password,
      })
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) => console.error(error));
  }
}

export default new Service();
