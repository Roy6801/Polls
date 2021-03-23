import axios from "axios";

const API_BASE_URL = "http://192.168.1.204:5000/";

class Service {
  login(userName, password) {
    axios.post(API_BASE_URL + "/loginUser", {
      userName: userName,
      password: password,
    });
  }

  register(userName, password, firstName, lastName, email, mobileNo) {
    axios
      .post(API_BASE_URL + "registerUser", {
        userName: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
      })
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) => console.error(error));
  }

  getPassword(userName, password) {
    axios.get(API_BASE_URL + { userName } + "/getPassword", {
      userName: userName,
      password: password,
    });
  }

  updateUserName(userName) {
    axios.put(API_BASE_URL + { userName } + "/updateUserName", {
      userName: userName,
    });
  }

  updatePassword(userName, password) {
    axios.put(API_BASE_URL + { userName } + "/updatePassword", {
      userName: userName,
      password: password,
    });
  }
}

export default new Service();
