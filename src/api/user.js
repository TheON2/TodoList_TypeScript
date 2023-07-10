import api from "../axios/api";

//user
const addUser = async (newUser) => {
  await api.post(`/user`, newUser);
};

const getUser = async (userEmail) => {
  const response = await api.get(`/user/${userEmail}`);
  return response.data;
};

const getUsers = async () => {
  const response = await api.get(`/user`);
  return response.data;
};

const getAuthToken = async () => {
  const response = await api.get(`/usertoken`);
  return response.data;
};

const profileChange = async (data) => {
  const response = await api.post(`/user/images`, data);
  return response.data;
};

const getProfileImage = async () => {
  const response = await api.get(`/user/image`);
  return response.data;
};

const userLogin = async (loginUser) => {
  const response = await api.post(`/user/login`, loginUser);
  return response.data;
};

const userLogOut = async () => {
  await api.post(`/user/logout`);
};

const updateUser = async (sendData) => {
  await api.patch(`/user/${sendData.email}/nickname`, {nickname: sendData.nickname});
};

const deleteUser = async (userEmail) => {
  await api.delete(`/user/${userEmail}`);
};

export {addUser,getUser,profileChange, getUsers,getAuthToken, updateUser, deleteUser, userLogin, userLogOut};