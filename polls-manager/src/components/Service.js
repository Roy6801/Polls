import axios from "axios";

const API_BASE_URL = "http://localhost:5000/";

const verifyToken = async (user) => {
  return axios.post(API_BASE_URL + "VerifyToken", { ...user });
};

const login = async (user) => {
  return axios.post(API_BASE_URL + "LoginUser", { ...user });
};

const register = async (user) => {
  return axios.post(API_BASE_URL + "RegisterUser", { ...user });
};

const updateUserName = async (user) => {
  return axios.post(API_BASE_URL + "UpdateUserName", { ...user });
};

const updatePassword = async (user) => {
  return axios.post(API_BASE_URL + "UpdatePassword", { ...user });
};

const createPoll = async (user) => {
  return axios.post(API_BASE_URL + "CreatePoll", { ...user });
};

const getPollListByAdmin = async (user) => {
  return axios.post(API_BASE_URL + "GetPollListByAdmin", { ...user });
};

const getAdminByPoll_Id = async (user) => {
  return axios.post(API_BASE_URL + "GetAdminByPoll_Id", { ...user });
};

const getPollInfo = async (url) => {
  return axios.get(API_BASE_URL + "PollInfo/" + url);
};

const userPresent = async (user) => {
  return axios.post(API_BASE_URL + "UserPresent", { ...user });
};

const registerForPoll = async (user) => {
  return axios.post(API_BASE_URL + "Poll", { ...user });
};

const getRegisteredUsers = async (user) => {
  return axios.post(API_BASE_URL + "GetRegisteredUsers", { ...user });
};

const getParticipatedUsers = async (user) => {
  return axios.post(API_BASE_URL + "GetParticipatedUsers", { ...user });
};

const getPollResults = async (user) => {
  return axios.post(API_BASE_URL + "GetPollResults", { ...user });
};

const crypt = (str, flag) => {
  const len = str.length;
  var val = "";

  if (flag) {
    str = str.split("").reverse().join("");
    for (var i = 0; i < len; i++) {
      var temp = str.charCodeAt(i);
      if (i % 2 === 0) {
        temp = temp + len;
      } else {
        temp = temp - len;
      }
      val = val + String.fromCharCode(temp);
    }
  } else {
    for (var i = 0; i < len; i++) {
      var temp = str.charCodeAt(i);
      if (i % 2 === 0) {
        temp = temp - len;
      } else {
        temp = temp + len;
      }
      val = val + String.fromCharCode(temp);
    }
    val = val.split("").reverse().join("");
  }
  return val;
};

export default {
  crypt,
  verifyToken,
  login,
  register,
  updateUserName,
  updatePassword,
  createPoll,
  userPresent,
  registerForPoll,
  getPollListByAdmin,
  getAdminByPoll_Id,
  getPollInfo,
  getRegisteredUsers,
  getParticipatedUsers,
  getPollResults,
};
