import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/webinarComment/";
// const API_PATH_USERZOOM = ConstantList.API_ENPOINT + "/api/userZoom/";
// const API_PATH_ROLE = ConstantList.API_ENPOINT + "/api/roles/";

export const searchByPage = healthOrgLevel => {
  return axios.post(API_PATH + "searchByDto", healthOrgLevel);
};

export const getItemById = id => {
  return axios.get(API_PATH + id);
};

export const saveItem = webinarComment => {
  return axios.post(API_PATH, webinarComment);
};

export const updateItem = (id, webinarComment) => {
  return axios.put(API_PATH + id, webinarComment);
}

export const deleteItem = id => {
  return axios.delete(API_PATH + id);
};




//==========================================
// export const findUserByUserName = (username, page, pageSize) => {
//   var params = "username/" + username + "/" + page + "/" + pageSize;
//   var url = API_PATH + params;
//   return axios.get(url);
// };

// export const getAllRoles = () => {
//   var url = API_PATH_ROLE + 'all';
//   return axios.get(url);
// };




// export const getUserByUsername = (username) => {
//   const config = { params: { username: username } };
//   var url = API_PATH;
//   return axios.get(url, config);
// };

// export const saveUser = user => {
//   return axios.post(API_PATH, user);
// };

// //==========================================
// export const getUserById = id => {
//   return axios.get("/api/user", { data: id });
// };

// export const checkCode = (id, code) => {
//   const config = { params: { id: id, code: code } };
//   var url = ConstantList.API_ENPOINT + "/api/healthOrgType/checkCode";
//   return axios.get(url, config);
// };

// //==========================================
// export const getUserZoom = (userId) => {
//   var url = API_PATH_USERZOOM + "getZoom/" + userId
//   return axios.get(url);
// };

// export const saveUserZoom = (user, idUser) => {
//   return axios.post(API_PATH_USERZOOM + idUser, user);
// };

// export const updateUserZoom = (idUser, meetingId, meetingPassw) => {

//   return axios.put(API_PATH_USERZOOM + "update/" + idUser + "?meetingId=" + meetingId + "&meetingPassw=" + meetingPassw);
// };