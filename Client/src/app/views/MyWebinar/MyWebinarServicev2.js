import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/user_webinar";
const API_PATH1 = ConstantList.API_ENPOINT + "/api/webinar";
const API_PATH2 = ConstantList.API_ENPOINT + "/api/users/";

export const searchByPage = healthOrgLevel => {
  return axios.post(API_PATH + "/searchByDto", healthOrgLevel);
};

// export const getUserById = id => {
//   return axios.get("/api/user", { data: id });
// };

// export const getAllUser = () => {
//   return axios.get(API_PATH2);
// }

export const saveItem = item => {
  return axios.post(API_PATH, item);
}

export const getAllWebinar = () => {
  return axios.get(API_PATH1);
}

// export const getUserByUsername = (userName) => {
//   return axios.get(API_PATH2, userName);
// };

export const getWebinarByCode = (code) => {
  return axios.get(API_PATH1+"/duc/"+code);
};

// export const saveItemAndChangeRole = item => {
//   return axios.post(API_PATH + "/saveAndChangeRole", item);
// }

// export const updateItem = item => {
//   return axios.put(API_PATH + "/" + item.id, item);
// };

// export const deleteItem = id => {
//   return axios.delete(API_PATH + "/" + id);
// };

// export const getItemById = id => {
//   return axios.get(API_PATH + "/" + id);
// };

// export const checkCode = (id, code) => {
//   const config = { params: { id: id, code: code } };
//   var url = API_PATH + "/checkCode";
//   return axios.get(url, config);
// };
// export const addWebinar = (id) => {
//   var url = ConstantList.API_ENPOINT + "/api/webinar/addtoList/" + id;
//   return axios.post(url);
// };

// export const likeWebinar = (id) => {
//   var url = ConstantList.API_ENPOINT + "/api/webinar/likeWebinar/" + id;
//   return axios.get(url);
// };

// export const checkExits = () => {
//   var url = ConstantList.API_ENPOINT + "/api/userZoom/checkExits";
//   return axios.get(url);
// }

// export const uploadImage = (file, id) => {
//   const url = ConstantList.API_ENPOINT + "/api/upload/image";
//   let formData = new FormData();
//   formData.append('file', file);
//   formData.append('webinarId', id);
//   const config = {
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
//   }
//   return axios.post(url, formData, config)
// }

// export const checkCountDown = () => {
//   var url = API_PATH + "/checkCountDown";
//   return axios.get(url);
// }
