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

const getPollListByAdmin = async (admin) => {
  return axios.get(API_BASE_URL + "GetPollListByAdmin/" + admin);
};

const getPollInfo = async (url) => {
  return axios.get(API_BASE_URL + "PollInfo/" + url);
};

const getPollOptions = async (url) => {
  return axios.get(API_BASE_URL + "PollOptions/" + url);
};

const userPresent = async (user) => {
  return axios.get(
    API_BASE_URL + "UserPresent/" + user.poll_Id + "/" + user.userName
  );
};

const registerForPoll = async (user) => {
  return axios.post(API_BASE_URL + "Poll", { ...user });
};

const participateInPoll = async (
  poll_Id,
  userName,
  scheduled,
  radio,
  answer
) => {
  return axios.post(
    API_BASE_URL +
      "Participate/" +
      poll_Id +
      "/" +
      userName +
      "/" +
      scheduled +
      "/" +
      radio,
    { ...answer }
  );
};

const getParticipants = async (url) => {
  return axios.get(API_BASE_URL + "GetParticipants/" + url);
};

const getPollResults = async (url) => {
  return axios.get(API_BASE_URL + "PollResults/" + url);
};

const getRegisteredInPolls = async (userName, part) => {
  return axios.get(API_BASE_URL + "RegisteredInPolls/" + userName + "/" + part);
};

const getPollsToStart = async (userName, time) => {
  return axios.get(API_BASE_URL + "PollsToStart/" + userName + "/" + time);
};

const searchPolls = async (userName, pollName) => {
  return axios.get(API_BASE_URL + "SearchPolls/" + userName + "/" + pollName);
};

const userAnalysis = async (userName) => {
  return axios.get(API_BASE_URL + "UserAnalysis/" + userName);
};

const crypt = (str, flag) => {
  if (flag) {
    str = str.split("").reverse();
    const len = str.join(".").length;
    for (var i = 0; i < str.length; i++) {
      var temp = str[i].charCodeAt(0);
      if (i % 2 === 0) {
        str[i] = temp + len;
      } else {
        str[i] = temp - len;
      }
    }
    return str.join(".");
  } else {
    var len = str.length;
    len -= str.split(".").length;
    str = str.split(".");
    for (var i = 0; i < str.length; i++) {
      if (i % 2 === 0) {
        str[i] = Number(str[i]) - len;
      } else {
        str[i] = Number(str[i]) + len;
      }
      str[i] = String.fromCharCode(str[i]);
    }
    return str.reverse().join("");
  }
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
  participateInPoll,
  getPollListByAdmin,
  getPollInfo,
  getPollOptions,
  getParticipants,
  getPollResults,
  getRegisteredInPolls,
  getPollsToStart,
  searchPolls,
  userAnalysis,
};
