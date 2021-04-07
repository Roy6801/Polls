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

const getPollInfo = async (user) => {
  return axios.post(API_BASE_URL + "GetPollInfo", { ...user });
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

export default {
  verifyToken,
  login,
  register,
  updateUserName,
  updatePassword,
  createPoll,
  getPollListByAdmin,
  getAdminByPoll_Id,
  getPollInfo,
  getRegisteredUsers,
  getParticipatedUsers,
  getPollResults,
};
