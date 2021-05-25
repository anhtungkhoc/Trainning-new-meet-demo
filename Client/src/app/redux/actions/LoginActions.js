import jwtAuthService from "../../services/jwtAuthService";
import FirebaseAuthService from "../../services/firebase/firebaseAuthService";
import { setUserData } from "./UserActions";
import history from "history.js";
import ConstantList from "../../appConfig";
import axios from "axios";

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const CONFIRM_REGISTRATION = "CONFIRM_REGISTRATION";

export  function loginWithEmailAndPassword({ email, password }) {
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });

    jwtAuthService
      //.loginWithEmailAndPassword(email, password)
      //.loginWithToken()
      .loginWithUserNameAndPassword(email,password)
      .then(user => {
        dispatch(setUserData(user));
        //Lưu lại thông tin liên quan đến token tại đây

        //Nhảy đến trang HomePage dự kiến
        history.push({
          pathname: ConstantList.ROOT_PATH+"webinar"
        });
        return dispatch({
          type: LOGIN_SUCCESS
        });
      })
      .catch(error => {
        alert('Tài khoản hoặc mật khẩu không đúng. Mời bạn đăng nhập lại');//Cần xem cách đưa ra thông báo thông qua đa ngôn ngữ
        return dispatch({
          type: LOGIN_ERROR,
          payload: error
        });
      });
  };
}

export function resetPassword({ email }) {
  return dispatch => {
    dispatch({
      payload: email,
      type: RESET_PASSWORD
    });
  };
}

export function firebaseLoginEmailPassword(email, password) {
  console.log(email + "  " + password)
  // console.log("login "  + email + " " +password )
  // return dispatch => {
  //   dispatch({
  //     type: LOGIN_LOADING
  //   });
  
  //   FirebaseAuthService.signInWithEmailAndPassword(email, password)
  //     .then(user => {
        
  //         dispatch(setUserData(user));
          
  //         history.push({
  //           pathname: ConstantList.ROOT_PATH+"webinar"
  //         });

  //         return dispatch({
  //           type: LOGIN_SUCCESS
  //         });
          
  //     })
  //     .catch(error => {
      
  //       return dispatch({
  //         type: LOGIN_ERROR,
  //         payload: error,
        
  //       });
  //     });    
  // }; 
  FirebaseAuthService.signInWithEmailAndPassword(email, password)
  .then(({ user }) => {
    
      setUserData(user);
      
      history.push({
        pathname: ConstantList.ROOT_PATH+"webinar"
      });

      return {
        type: LOGIN_SUCCESS
      };
      
  })
  .catch(error => {
  
    return {
      type: LOGIN_ERROR,
      payload: error,
    
    };
  }); 
}
export const confirmRegistration = (token) => dispatch => {
  axios({
    method: 'get',
    url: ConstantList.API_ENPOINT + "/public/user/confirmRegistration",
    params: {
      token
    }
  }).then(res => {
    dispatch({
      type: CONFIRM_REGISTRATION,
      payload: res.data
    })
  })
}
